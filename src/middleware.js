import { NextResponse } from "next/server";

export function middleware(req) {
  const url = req.nextUrl;
  const pathname = url.pathname;

  // Extraindo parâmetros da rota dinâmica
  const pathSegments = pathname.split("/");
  let idEvento, idCandidato, idProjeto, idVisitante, idAvaliador;
  let backUrl;

  if (pathname.startsWith("/votacao/interna/confirmacao")) {
    idCandidato = pathSegments[4];
    idEvento = pathSegments[5];

    if (!idCandidato || !idEvento) {
      const errorUrl = new URL("/error", req.url);
      errorUrl.searchParams.set("message", "Parâmetros inválidos na URL.");
      return NextResponse.redirect(errorUrl);
    }

    backUrl = `${process.env.NEXT_PUBLIC_API_URL}votacao/interna/confirmacao/verificacao?idAluno=${idCandidato}&idEvento=${idEvento}`;

  } else if (pathname.startsWith("/votacao/publica/confirmacao/convidado")) {
    idEvento = pathSegments[5];
    idProjeto = pathSegments[6];
    idVisitante = pathSegments[7];

    if (!idEvento || !idProjeto || !idVisitante) {
      const errorUrl = new URL("/error", req.url);
      errorUrl.searchParams.set("message", "Parâmetros inválidos na URL.");
      return NextResponse.redirect(errorUrl);
    }

    backUrl = `${process.env.NEXT_PUBLIC_API_URL}votacao/publica/confirmacao/visitante/verificacao?id_visitante=${idVisitante}&id_projeto=${idProjeto}&id_evento=${idEvento}`;

  } else if (pathname.startsWith("/votacao/publica/confirmacao/avaliador")) {
    idEvento = pathSegments[5];
    idProjeto = pathSegments[6];
    idAvaliador = pathSegments[7];

    if (!idEvento || !idProjeto || !idAvaliador) {
      const errorUrl = new URL("/error", req.url);
      errorUrl.searchParams.set("message", "Parâmetros inválidos na URL.");
      return NextResponse.redirect(errorUrl);
    }

    backUrl = `${process.env.NEXT_PUBLIC_API_URL}votacao/publica/confirmacao/avaliador/verificacao?id_avaliador=${idAvaliador}&id_projeto=${idProjeto}&id_evento=${idEvento}`;
  }

  return fetch(backUrl)
    .then(async (response) => {
      const data = await response.json();
      if (!response.ok) {
        const errorUrl = new URL("/error", req.url);
        errorUrl.searchParams.set("message", data.message || "Erro ao verificar o voto.");
        return NextResponse.redirect(errorUrl);
      }
      return NextResponse.next();
    })
    .catch((error) => {
      console.error("Erro ao verificar o voto:", error);
      const errorUrl = new URL("/error", req.url);
      errorUrl.searchParams.set("message", error.message || "Erro desconhecido.");
      return NextResponse.redirect(errorUrl);
    });
}

export const config = {
  matcher: [
    "/votacao/interna/confirmacao/:path*",
    "/votacao/publica/confirmacao/convidado/:path*",
    "/votacao/publica/confirmacao/avaliador/:path*",
  ],
};
