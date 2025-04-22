import { NextResponse } from "next/server";

export function middleware(req) {
  const url = req.nextUrl;
  const pathname = url.pathname;

  // Extraindo parâmetros da rota dinâmica
  const pathSegments = pathname.split("/");
  const idCandidato = pathSegments[4];
  const idEvento = pathSegments[5];
  let backUrl;

  if (!idCandidato || !idEvento) {
    const errorUrl = new URL("/error", req.url);
    errorUrl.searchParams.set("message", "Parâmetros inválidos na URL.");
    return NextResponse.redirect(errorUrl);
  }

  backUrl = `${process.env.NEXT_PUBLIC_API_URL}votacao/interna/confirmacao/verificacao?idAluno=${idCandidato}&idEvento=${idEvento}`;

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
  matcher: "/votacao/interna/confirmacao/:path*",
};