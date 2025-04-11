import { NextResponse } from "next/server";


export function middleware(req) {
  const url = req.nextUrl;
  const idCandidato = url.searchParams.get("id_candidato");
  const idEvento = url.searchParams.get("id_evento");

  if (!idCandidato || !idEvento) {
    return NextResponse.redirect(new URL("/erro", req.url));
  }

  return fetch(
    `${process.env.NEXT_PUBLIC_API_URL}votacao/interna/confirmacao/verificacao?idAluno=${idCandidato}&idEvento=${idEvento}`
  )
    .then(async (response) => {
      const data = await response.json();

      console.log(
        `Verificando se o aluno já votou... ${data.voto_confirmado ? "Sim" : "Não"}`
      );
      console.log(data);
      if (!response.ok) {
        return NextResponse.redirect(new URL("/erro", req.url));
      }

      return NextResponse.next();
    })
    .catch((error) => {
      console.error("Erro ao verificar o voto:", error);
      return NextResponse.redirect(new URL("/erro", req.url));
    });
}

export const config = {
  matcher: "/votacao/interna/confirmacao/:path*",
};