"use client";

import DemoForm from "@/components/DemoForm";
import { useState } from "react";

export default function Hero() {
  const [activeTab, setActiveTab] = useState<"demo" | "upload">("demo");

  return (
    <section className="bg-white text-center py-20">
      <h1 className="text-4xl md:text-6xl font-bold leading-tight text-zinc-800">
        Inteligência que organiza sua{" "}
        <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          caixa de entrada
        </span>
      </h1>
      <p className="mt-5 text-zinc-800 text-lg">
        Classifique automaticamente seus e-mails em <strong>Produtivos</strong>{" "}
        ou <strong>Improdutivos</strong> e ganhe tempo no que importa.
      </p>

      {/* Botões */}
      <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
        <button
          onClick={() => setActiveTab("demo")}
          className={`w-full sm:w-auto px-8 py-4 rounded-lg text-base font-semibold transition-all duration-300 shadow-lg
            ${
              activeTab === "demo"
                ? "bg-gray-900 text-white hover:bg-gray-800"
                : "bg-white text-gray-900 border border-gray-300 hover:bg-gray-50"
            }`}
        >
          Ver demonstração
        </button>

        <button
          onClick={() => setActiveTab("upload")}
          className={`w-full sm:w-auto px-8 py-4 rounded-lg text-base font-semibold transition-all duration-300 shadow-lg
            ${
              activeTab === "upload"
                ? "bg-gray-900 text-white hover:bg-gray-800"
                : "bg-white text-gray-900 border border-gray-300 hover:bg-gray-50"
            }`}
        >
          Testar EML / PDF / TXT
        </button>
      </div>

      {/* Conteúdo condicional */}
      <div className="mt-10 max-w-2xl mx-auto">
        {activeTab === "demo" && (
          <div className="p-6 border rounded-lg bg-gray-50 text-left">
            <h3 className="font-semibold text-lg mb-2">Demonstração</h3>
            <p className="text-sm text-gray-600">
              Exiba um formulário simples para colar o conteúdo de um e-mail e
              classificar (ou use um exemplo pronto).
            </p>
          </div>
        )}

        {activeTab === "upload" && (
          <div className="text-sm text-gray-600">
            <DemoForm />
          </div>
        )}
      </div>
    </section>
  );
}
