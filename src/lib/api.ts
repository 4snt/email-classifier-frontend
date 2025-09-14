import { toast } from "sonner";

/**
 * Classifica texto enviado diretamente
 */
export async function classifyEmail(body: string, profileId: string) {
  const endpoint = process.env.NEXT_PUBLIC_API_URL + "/classify";

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        subject: null,
        body,
        sender: null,
        profile_id: profileId,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      toast.error(`Erro na classificação de texto: ${errText}`);
      return null;
    }

    return await res.json();
  } catch (err: any) {
    toast.error("Falha ao conectar ao servidor");
    return null;
  }
}

/**
 * Classifica arquivo .txt ou .pdf
 */
export async function classifyFile(file: File, profileId: string) {
  const endpoint =
    process.env.NEXT_PUBLIC_API_URL + `/classify?profile_id=${profileId}`;

  try {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(endpoint, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const errText = await res.text();
      toast.error(`Erro na classificação de arquivo: ${errText}`);
      return null;
    }

    return await res.json();
  } catch (err: any) {
    toast.error("Falha ao conectar ao servidor");
    return null;
  }
}
