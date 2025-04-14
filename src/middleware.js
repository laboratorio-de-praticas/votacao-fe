import { NextResponse } from "next/server";


export function middleware(req) {
  const url = req.nextUrl;
  const pathname = url.pathname;
  const idCandidato = url.searchParams.get("id_candidato");
  const idEvento = url.searchParams.get("id_evento");
  const idProjeto = url.searchParams.get("id_projeto");
  let backUrl; 

  if ((!idCandidato && !idProjeto) || !idEvento) {
    return NextResponse.redirect(new URL("/erro", req.url));
  }

  if(idCandidato){
    backUrl = `${process.env.NEXT_PUBLIC_API_URL}votacao/interna/confirmacao/verificacao?idAluno=${idCandidato}&idEvento=${idEvento}`
  }

  if(pathname.startsWith("/votacao/publica/confirmacao/convidado")){
    backUrl = `${process.env.NEXT_PUBLIC_API_URL}/votacao/publica/confirmacao/visitante/verificacao?id_evento=${idEvento}&id_projeto=${idProjeto}&id_visitante=1`;
  }else{
    backUrl=`${process.env.NEXT_PUBLIC_API_URL}votacao/publica/confirmacao/avaliador/verificacao?id_evento=${idEvento}&id_projeto=${idProjeto}&id_avaliador=1`
  }
  return fetch(url).then(async (response) => {
    const data = await response.json();
    console.log(response);
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
    //return NextResponse.redirect(new URL("/erro", req.url));
  });


}

export const config = {
  matcher: "/votacao/interna/confirmacao/:path*",
  matcher: "/votacao/publica/confirmacao/avaliador/:path*",
  matcher: "/votacao/publica/confirmacao/convidado/:path*",
};