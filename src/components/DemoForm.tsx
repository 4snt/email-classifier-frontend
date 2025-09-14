"use client";

import profiles from "@/data/profiles.json";
import type { ClassifyResponse } from "@/lib/api"; // 👈 importa direto o tipo da API
import { classifyEmail, classifyFile } from "@/lib/api";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/Button";

export default function ClassifierForm() {
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<ClassifyResponse | null>(null); // 👈 usa o mesmo tipo
  const [loading, setLoading] = useState(false);
  const [profileId, setProfileId] = useState<string>(""); // 👈 string vazia, nunca null
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      let res: ClassifyResponse | null = null;

      if (file) {
        res = await classifyFile(file, { profileId: profileId || null });
      } else if (text.trim().length > 0) {
        res = await classifyEmail(text, { profileId: profileId || null });
      } else {
        toast.warning("Nenhum texto ou arquivo fornecido");
        setLoading(false);
        return;
      }

      if (!res) {
        toast.error("Erro ao classificar");
        setLoading(false);
        return;
      }

      setResult(res);

      // reset
      setFile(null);
      setText("");
      if (fileInputRef.current) fileInputRef.current.value = "";

      toast.success("Classificação concluída!");
    } catch (err) {
      console.error(err);
      toast.error("Erro inesperado ao classificar");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-10 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Teste agora</h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 bg-white p-6 rounded-xl shadow-xl border border-gray-200 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl"
      >
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
            value={profileId}
            onChange={(e) => setProfileId(e.target.value || "")}
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

        {/* Campo de texto */}
        <div className="flex flex-col text-left">
          <label
            htmlFor="email-text"
            className="text-sm font-medium text-gray-700 mb-2"
          >
            Texto do e-mail
          </label>
          <textarea
            id="email-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Cole aqui o conteúdo de um e-mail..."
            className="border rounded-lg p-4 text-sm bg-gray-50 focus:ring-4 focus:ring-purple-200 focus:outline-none transition-all duration-300"
            rows={5}
          />
        </div>

        {/* Upload de arquivo */}
        <div className="flex flex-col text-left">
          <label
            htmlFor="file-upload"
            className="text-sm font-medium text-gray-700 mb-2"
          >
            Ou envie um arquivo
          </label>
          <input
            id="file-upload"
            ref={fileInputRef}
            type="file"
            accept=".txt,.pdf,.eml" // 👈 agora aceita .eml
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="block w-full text-sm text-gray-600
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-md file:border-0
                       file:text-sm file:font-medium
                       file:bg-purple-50 file:text-purple-700
                       hover:file:bg-purple-100"
          />
          {file && (
            <p className="mt-2 text-sm text-purple-700">
              Arquivo selecionado: {file.name}
            </p>
          )}
        </div>

        {/* Botão */}
        <Button
          type="submit"
          isLoading={loading}
          variant="primary"
          size="lg"
          className="w-full"
        >
          {loading ? "Classificando..." : "Classificar"}
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
          {result.total_tokens !== undefined && (
            <div className="mt-4 pt-4 border-t text-sm text-gray-600">
              <div>
                <strong>Model:</strong> {result.used_model}
              </div>
              <div>
                <strong>Prompt tokens:</strong> {result.prompt_tokens}
              </div>
              <div>
                <strong>Completion tokens:</strong> {result.completion_tokens}
              </div>
              <div>
                <strong>Total tokens:</strong> {result.total_tokens}
              </div>
              <div>
                <strong>Custo:</strong>{" "}
                {result.cost_usd
                  ? `$${Number(result.cost_usd).toFixed(4)}`
                  : "N/A"}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
