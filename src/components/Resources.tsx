"use client";

export default function Resources() {
  const youtubeUrl = process.env.NEXT_PUBLIC_YOUTUBE_URL;

  return (
    <section className="bg-white py-20">
      <div className="max-w-5xl mx-auto px-6 text-center space-y-14">
        {/* Heading principal */}
        <div className="space-y-4">
          <h2 className="text-4xl md:text-5xl font-light tracking-wide bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            Recursos do Projeto
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Veja a{" "}
            <span className="font-medium text-purple-600">demo em vídeo</span>,
            explore os repositórios e a
            <span className="font-medium text-pink-500">
              {" "}
              documentação da API
            </span>
            .
          </p>
        </div>

        {/* Player do YouTube */}
        {youtubeUrl ? (
          <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-xl ring-1 ring-gray-200 hover:ring-purple-300 transition">
            <iframe
              src={youtubeUrl}
              title="Demo do Email Classifier"
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <div className="text-sm text-gray-500 italic">
            🔒 URL do vídeo não configurada (adicione em{" "}
            <code>.env.local → NEXT_PUBLIC_YOUTUBE_URL</code>)
          </div>
        )}

        {/* Links principais */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-12">
          <a
            href="https://apiemailclassifier.flipafile.com/docs#"
            target="_blank"
            rel="noopener noreferrer"
            className="p-8 border rounded-2xl shadow-sm bg-gray-50 hover:shadow-lg hover:-translate-y-1 hover:border-purple-300 transition transform duration-300"
          >
            <h3 className="font-light text-xl text-purple-600 tracking-wide">
              Swagger API
            </h3>
            <p className="text-base text-gray-600 mt-3">
              Documentação interativa da API FastAPI.
            </p>
          </a>

          <a
            href="https://github.com/4snt/email-classifier-frontend"
            target="_blank"
            rel="noopener noreferrer"
            className="p-8 border rounded-2xl shadow-sm bg-gray-50 hover:shadow-lg hover:-translate-y-1 hover:border-purple-300 transition transform duration-300"
          >
            <h3 className="font-light text-xl text-purple-600 tracking-wide">
              Frontend Repo
            </h3>
            <p className="text-base text-gray-600 mt-3">
              Código do front em Next.js + Tailwind.
            </p>
          </a>

          <a
            href="https://github.com/4snt/email-classifier"
            target="_blank"
            rel="noopener noreferrer"
            className="p-8 border rounded-2xl shadow-sm bg-gray-50 hover:shadow-lg hover:-translate-y-1 hover:border-purple-300 transition transform duration-300"
          >
            <h3 className="font-light text-xl text-purple-600 tracking-wide">
              Backend Repo
            </h3>
            <p className="text-base text-gray-600 mt-3">
              API em FastAPI com arquitetura hexagonal.
            </p>
          </a>
        </div>
      </div>
    </section>
  );
}
