"use client";

import profiles from "@/data/profiles.json";
import { configureImapService, stopImapService } from "@/lib/api";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/Button";

type ImapResponse = {
  status: string;
  profile_id?: string;
  interval?: number;
  mailbox?: string;
  host?: string;
};

export default function ImapForm() {
  const [form, setForm] = useState({
    host: "imap.gmail.com",
    user: "",
    password: "",
    mailbox: "INBOX",
    profile_id: "",
    interval: 10,
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ImapResponse | null>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await configureImapService(form);
      if (!res) {
        toast.error("Erro ao configurar IMAP");
        setLoading(false);
        return;
      }

      setResult(res);
      toast.success("Serviço IMAP iniciado");
    } catch (err) {
      console.error(err);
      toast.error("Erro inesperado ao configurar");
    } finally {
      setLoading(false);
    }
  }

  async function handleStop() {
    const res = await stopImapService();
    if (res) {
      setResult(null);
    }
  }

  return (
    <div className="mt-10 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Conectar via IMAP GMAIL (MVP)</h2>

      <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-gray-700 space-y-2">
        <p>
          <strong>Este protótipo só funciona com contas do Gmail.</strong>
        </p>
        <p>
          Para conectar, você precisa ativar{" "}
          <strong>verificação em duas etapas (2FA)</strong> e usar uma{" "}
          <strong>Senha de App</strong> em vez da sua senha normal.
        </p>
        <p>
          <a
            href="https://myaccount.google.com/apppasswords"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-600 underline hover:text-purple-800"
          >
            Clique aqui para gerar sua senha de app no Google
          </a>
        </p>
        <p>Os logs não são permanentes — este é apenas um protótipo.</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 bg-white p-6 rounded-xl shadow-xl border border-gray-200 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl"
      >
        <input
          type="text"
          name="user"
          value={form.user}
          onChange={handleChange}
          placeholder="Usuário (ex: seuemail@gmail.com)"
          className="border rounded-lg p-3 text-sm bg-gray-50"
          required
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Senha de App (16 caracteres)"
          className="border rounded-lg p-3 text-sm bg-gray-50"
          required
        />

        <div className="flex flex-col text-left">
          <label
            htmlFor="profile"
            className="text-sm font-medium text-gray-700 mb-2"
          >
            Escolha o perfil de classificação
          </label>
          <select
            id="profile"
            name="profile_id"
            value={form.profile_id}
            onChange={handleChange}
            className="border rounded-lg p-3 text-sm bg-gray-50 focus:ring-4 focus:ring-purple-200 focus:outline-none transition-all duration-300"
          >
            <option value="">Selecione um perfil</option>
            {Object.values(profiles).map((p: any) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <Button
          type="submit"
          isLoading={loading}
          variant="primary"
          size="lg"
          className="w-full"
        >
          {loading ? "Conectando..." : "Iniciar Serviço IMAP"}
        </Button>

        <Button
          type="button"
          onClick={handleStop}
          variant="secondary"
          size="lg"
          className="w-full"
        >
          Parar Serviço IMAP
        </Button>
      </form>

      {result && (
        <div className="mt-6 p-4 rounded-lg border bg-gray-50 shadow text-left space-y-2">
          <div>
            <strong>Status:</strong> {result.status}
          </div>
          {result.profile_id && (
            <div>
              <strong>Perfil:</strong> {result.profile_id}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
