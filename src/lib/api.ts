import { toast } from "sonner";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "";

export type Category = "productive" | "unproductive";

export interface ClassifyResponse {
  category: Category;
  reason: string;
  suggested_reply: string;
  used_model?: string | null;
  prompt_tokens?: number | null;
  completion_tokens?: number | null;
  total_tokens?: number | null;
  cost_usd?: number | null;
}

export interface LogItem extends ClassifyResponse {
  id: number;
  created_at: string;
  source: "json" | "file" | string;
  subject: string | null;
  body_excerpt: string | null;
  sender: string | null;
  file_name: string | null;
  profile_id: string | null;
  provider?: string | null;
  latency_ms?: number | null;
  status?: string | null;
  error?: string | null;
  extra?: unknown;
}

async function parseJSON(res: Response) {
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function buildUrl(
  path: string,
  params?: Record<string, string | number | boolean | undefined | null>
) {
  const url = new URL(path, API_BASE || window.location.origin);
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== "")
        url.searchParams.set(k, String(v));
    });
  }
  return url.toString();
}

function showHttpError(res: Response, payload: any, context: string) {
  if (res.status === 429) {
    const ra = res.headers.get("Retry-After");
    toast.error(
      `${context}: limite atingido (429). Tente novamente em ${
        ra ?? "alguns"
      } segundos.`
    );
    return;
  }
  const msg =
    typeof payload === "string"
      ? payload
      : payload?.detail ?? "Erro inesperado";
  toast.error(`${context}: ${msg}`);
}

export async function classifyEmail(
  body: string,
  opts?: {
    subject?: string | null;
    sender?: string | null;
    profileId?: string | null;
  }
) {
  const endpoint = buildUrl("/classify");
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        subject: opts?.subject ?? null,
        body,
        sender: opts?.sender ?? null,
        profile_id: opts?.profileId ?? undefined,
      }),
    });

    const payload = await parseJSON(res);
    if (!res.ok) {
      showHttpError(res, payload, "Erro na classificação de texto");
      return null;
    }
    return payload as ClassifyResponse;
  } catch (err) {
    toast.error("Falha ao conectar ao servidor");
    return null;
  }
}

export async function classifyFile(
  file: File,
  opts?: { profileId?: string | null }
) {
  const endpoint = buildUrl("/classify", {
    profile_id: opts?.profileId ?? undefined,
  });
  try {
    const form = new FormData();
    form.append("file", file);
    const res = await fetch(endpoint, { method: "POST", body: form });
    const payload = await parseJSON(res);
    if (!res.ok) {
      showHttpError(res, payload, "Erro na classificação de arquivo");
      return null;
    }
    return payload as ClassifyResponse;
  } catch {
    toast.error("Falha ao conectar ao servidor");
    return null;
  }
}
export async function classifyEml(file: File, profileId?: string | null) {
  return classifyFile(file, { profileId });
}

export async function fetchLogs(params?: {
  limit?: number;
  since?: string;
  category?: Category;
  profileId?: string;
}) {
  try {
    const url = buildUrl("/logs", {
      limit: params?.limit,
      since: params?.since,
      profile_id: params?.profileId,
    });
    const res = await fetch(url);
    const payload = await parseJSON(res);
    if (!res.ok) {
      showHttpError(res, payload, "Erro ao buscar logs");
      return null;
    }
    let data = payload as LogItem[];
    if (params?.category) {
      data = data.filter((x) => x.category === params.category);
    }
    if (params?.profileId) {
      data = data.filter(
        (x) => (x.profile_id ?? "default") === params.profileId
      );
    }
    return data;
  } catch {
    toast.error("Falha ao conectar ao servidor");
    return null;
  }
}
