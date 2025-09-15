"use client";

export default function Footer() {
  return (
    <footer
      className="bg-gray-50 border-t border-gray-200"
      style={{ fontFamily: "var(--font-inter)" }} // 👈 força Inter
    >
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-700">
        {/* Logo + Descrição */}
        <div>
          <div className="flex items-center space-x-2">
            <img
              src="/logo-autou.webp"
              alt="Email Classifier Logo"
              className="h-10 w-auto"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/logo-autou.webp"; // fallback
              }}
            />
            <h3 className="text-3xl font-light text-yellow-600 tracking-wide">
              Email Classifier
            </h3>
          </div>
          <p className="mt-2 text-sm">
            Organize sua caixa de entrada automaticamente com IA. Classifique
            e-mails em <strong>Produtivos</strong> e{" "}
            <strong>Improdutivos</strong>.
          </p>
        </div>

        {/* Navegação */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-3">
            Navegação
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:text-yellow-600 transition">
                Início
              </a>
            </li>
            <li>
              <a
                href="https://apiemailclassifier.flipafile.com/docs"
                target="_blank"
                className="hover:text-yellow-600 transition"
              >
                API Docs
              </a>
            </li>
            <li>
              <a
                href="https://github.com/4snt/email-classifier"
                target="_blank"
                className="hover:text-yellow-600 transition"
              >
                GitHub Repo
              </a>
            </li>
          </ul>
        </div>

        {/* Contato */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Contato</h4>
          <ul className="space-y-2 text-sm">
            <li>
              Email:{" "}
              <a
                href="mailto:murilo.escobedo@protonmail.com"
                className="text-yellow-600 hover:underline"
              >
                murilo.escobedo@protonmail.com
              </a>
            </li>
            <li>
              <a
                href="https://autou.flipafile.com"
                target="_blank"
                className="text-yellow-600 hover:underline"
              >
                autou.flipafile.com
              </a>
            </li>
          </ul>
          <div className="flex space-x-4 mt-4">
            <a
              href="https://github.com/4snt"
              target="_blank"
              className="text-gray-500 hover:text-yellow-600"
            >
              <i className="fab fa-github"></i> GitHub
            </a>
          </div>
        </div>
      </div>

      {/* Copy */}
      <div className="border-t border-gray-200 text-center py-4 text-xs text-gray-500">
        © {new Date().getFullYear()} Email Classifier MVP. Todos os direitos
        reservados.
      </div>
    </footer>
  );
}
