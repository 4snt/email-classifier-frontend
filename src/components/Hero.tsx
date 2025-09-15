"use client";

import DemoForm from "@/components/DemoForm";
import ImapForm from "@/components/ImapForm";
import { useState } from "react";
import Resources from "./Resources";

export default function Hero() {
  const [activeTab, setActiveTab] = useState<"demo" | "upload" | "imap">(
    "demo"
  );

  return (
    <section className="bg-white text-center py-20 px-6">
      <h1 className="text-3xl md:text-5xl font-light tracking-wide leading-tight text-zinc-800">
        Inteligência que organiza sua{" "}
        <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          caixa de entrada
        </span>
      </h1>
      <p className="mt-5 text-zinc-800 text-lg md:text-xl max-w-2xl mx-auto">
        Classifique automaticamente seus e-mails em <strong>Produtivos</strong>{" "}
        ou <strong>Improdutivos</strong> e ganhe tempo no que importa.
      </p>

      {/* Botões */}
      <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
        <button
          onClick={() => setActiveTab("demo")}
          className={`w-full sm:w-auto px-7 py-3.5 rounded-lg text-base font-medium transition-all duration-300 shadow-md
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
          className={`w-full sm:w-auto px-7 py-3.5 rounded-lg text-base font-medium transition-all duration-300 shadow-md
            ${
              activeTab === "upload"
                ? "bg-gray-900 text-white hover:bg-gray-800"
                : "bg-white text-gray-900 border border-gray-300 hover:bg-gray-50"
            }`}
        >
          Testar EML / PDF / TXT
        </button>

        <button
          onClick={() => setActiveTab("imap")}
          className={`w-full sm:w-auto px-7 py-3.5 rounded-lg text-base font-medium transition-all duration-300 shadow-md
            ${
              activeTab === "imap"
                ? "bg-gray-900 text-white hover:bg-gray-800"
                : "bg-white text-gray-900 border border-gray-300 hover:bg-gray-50"
            }`}
        >
          Conectar via IMAP
        </button>
      </div>

      {/* Conteúdo condicional */}
      <div className="mt-16 max-w-5xl mx-auto w-full">
        {activeTab === "demo" && (
          <div className="text-base text-gray-600">
            <Resources />
          </div>
        )}

        {activeTab === "upload" && (
          <div className="text-base text-gray-600">
            <DemoForm />
          </div>
        )}

        {activeTab === "imap" && (
          <div className="text-base text-gray-600">
            <ImapForm />
          </div>
        )}
      </div>
    </section>
  );
}
