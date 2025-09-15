"use client";

import profiles from "@/data/profiles.json";
import { configureImapService, stopImapService } from "@/lib/api";
import { X } from "lucide-react"; // 👈 ícone X
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
  const [file, setFile] = useState<File | null>(null); // 👈 arquivo opcional

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
    <div className="mt-12 max-w-3xl mx-auto px-6">
      <h2 className="text-3xl md:text-4xl font-light tracking-wide mb-8 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent text-center">
        Conectar via IMAP Gmail
      </h2>

      {/* Aviso */}
      <div className="mb-8 p-5 bg-yellow-50 border border-yellow-200 rounded-xl text-base text-gray-700 space-y-3 shadow-sm">
        <p>
          <strong>⚠️ Este protótipo só funciona com contas do Gmail.</strong>
        </p>
        <p>
          É necessário ativar <strong>2FA</strong> e usar uma{" "}
          <strong>Senha de App</strong>.
        </p>
        <p>
          <a
            href="https://myaccount.google.com/apppasswords"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-600 underline hover:text-purple-800"
          >
            👉 Clique aqui para gerar sua senha de app
          </a>
        </p>
        <p className="text-sm text-gray-500">
          Logs não são permanentes — apenas protótipo.
        </p>
      </div>

      {/* Formulário */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 bg-white p-8 rounded-2xl shadow-xl border border-gray-200 transition-all duration-300 hover:shadow-2xl"
      >
        <input
          type="text"
          name="user"
          value={form.user}
          onChange={handleChange}
          placeholder="Usuário (ex: seuemail@gmail.com)"
          className="border rounded-lg p-4 text-base bg-gray-50 focus:ring-2 focus:ring-purple-300 outline-none transition"
          required
        />

        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Senha de App (16 caracteres)"
          className="border rounded-lg p-4 text-base bg-gray-50 focus:ring-2 focus:ring-purple-300 outline-none transition"
          required
        />

        {/* Seleção de perfil */}
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
            className="border rounded-lg p-4 text-base bg-gray-50 focus:ring-2 focus:ring-purple-300 outline-none transition"
          >
            <option value="">Selecione um perfil</option>
            {Object.values(profiles).map((p: any) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        {/* Upload opcional de arquivo */}
        <div className="flex flex-col text-left">
          <label className="text-sm font-medium text-gray-700 mb-2">
            Testar upload de e-mail
          </label>
          <div className="relative">
            <input
              type="file"
              accept=".eml,.txt,.pdf"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
                         file:rounded-md file:border-0 file:text-sm file:font-medium
                         file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
            />
            {file && (
              <div className="mt-2 flex items-center justify-between bg-gray-100 px-3 py-2 rounded-lg text-sm text-gray-700">
                <span>📎 {file.name}</span>
                <button
                  type="button"
                  onClick={() => setFile(null)}
                  className="text-gray-500 hover:text-red-600 transition"
                >
                  <X size={18} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Botões */}
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

      {/* Resultado */}
      {result && (
        <div className="mt-8 p-5 rounded-xl border bg-gray-50 shadow text-left space-y-2">
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
