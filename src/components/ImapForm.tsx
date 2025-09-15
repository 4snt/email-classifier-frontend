"use client";

import profiles from "@/data/profiles.json"; // 👈 mesmo profiles do ClassifierForm
import type { ClassifyResponse } from "@/lib/api";
import { configureImapService } from "@/lib/api";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/Button";

export default function ImapForm() {
  const [form, setForm] = useState({
    host: "",
    user: "",
    password: "",
    mailbox: "INBOX",
    profile_id: "",
    interval: 60,
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ClassifyResponse | null>(null);

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
      toast.success("Serviço IMAP iniciado!");
    } catch (err) {
      console.error(err);
      toast.error("Erro inesperado ao configurar");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-10 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Conectar via IMAP</h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 bg-white p-6 rounded-xl shadow-xl border border-gray-200 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl"
      >
        {/* Campos IMAP */}
        <input
          type="text"
          name="host"
          value={form.host}
          onChange={handleChange}
          placeholder="IMAP Host"
          className="border rounded-lg p-3 text-sm bg-gray-50"
          required
        />
        <input
          type="text"
          name="user"
          value={form.user}
          onChange={handleChange}
          placeholder="Usuário"
          className="border rounded-lg p-3 text-sm bg-gray-50"
          required
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Senha / App password"
          className="border rounded-lg p-3 text-sm bg-gray-50"
          required
        />
        <input
          type="text"
          name="mailbox"
          value={form.mailbox}
          onChange={handleChange}
          placeholder="Pasta (ex: INBOX)"
          className="border rounded-lg p-3 text-sm bg-gray-50"
        />

        {/* Seletor de perfil */}
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

        <input
          type="number"
          name="interval"
          value={form.interval}
          onChange={handleChange}
          placeholder="Intervalo (segundos)"
          className="border rounded-lg p-3 text-sm bg-gray-50"
        />

        {/* Botão */}
        <Button
          type="submit"
          isLoading={loading}
          variant="primary"
          size="lg"
          className="w-full"
        >
          {loading ? "Conectando..." : "Iniciar Serviço IMAP"}
        </Button>
      </form>

      {/* Resultado */}
      {result && (
        <div className="mt-6 p-4 rounded-lg border bg-gray-50 shadow text-left space-y-2">
          <div>
            <strong>Categoria:</strong> {result.category}
          </div>
          <div>
            <strong>Motivo:</strong> {result.reason}
          </div>
          <div>
            <strong>Resposta sugerida:</strong> {result.suggested_reply}
          </div>
        </div>
      )}
    </div>
  );
}
