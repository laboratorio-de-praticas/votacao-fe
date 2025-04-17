"use client";
import Header from "@/components/header";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CongratsText from "@/components/congratsText";
import ProjectCard from "@/components/projectCard";
import Button from "@/components/button";

export default function VotacaoPublica({ params: paramsPromise }) {
  const router = useRouter();
  const [params, setParams] = useState(null);
  const [status, setStatus] = useState(null);
  
  useEffect(() => {
    const unwrapParams = async () => {
      const resolvedParams = await paramsPromise;
      setParams(resolvedParams);
    };

    unwrapParams();
  }, [paramsPromise]);

  useEffect(() => {
    if (!params) return;

    const verifyVote = async () => {
      try {
        const verificationResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}votacao/publica/confirmacao/avaliador/verificacao?id_avaliador=${params.idAvaliador}&id_projeto=${params.idProjeto}&id_evento=${params.idEvento}`
        );

        const verificationData = await verificationResponse.json();

        if (!verificationResponse.ok) {
          console.error("Erro na verificação do voto:", verificationData.message);
          throw new Error(
            `Erro ao verificar o voto: ${
              verificationData.message || "Erro desconhecido"
            }`
          );
        }

        const canVote = !verificationData.voto_confirmado;
        setStatus(canVote);
      } catch (error) {
        console.error("Erro ao verificar o voto:", error);
        alert(error.message);
      }
    };

    verifyVote();
  }, [params]);
  
  const description =
    "verifique abaixo se o projeto é o desejado e confirme em seguida.";
  
  const handleRedirect = () => {
    if (!params) return;

    router.push(
      `/votacao/publica/confirmacao/avaliador/${params.idEvento}/${params.idProjeto}/${params.idAvaliador}/classificacao`
    );
  };

  return (
    <>
      <Header text={"PROJETO"} />
      <div className="flex flex-col md:flex-row md:w-5/6 gap-8 mt-6 md:gap-12 md:mt-16 md:mb-16 md:justify-stretch md:self-center">
        <CongratsText
          text={description}
          onClickItem={handleRedirect}
          textButton={"VOTAR"}
        />
        <ProjectCard
          projectName={"Nome do Projeto"}
          projectDescription={"Descrição do Projeto"}
          imageUrl={"/undefinedImage.svg"}
        />
        <div className="md:hidden w-full flex justify-center">
          <Button onClick={handleRedirect} text={"VOTAR"} />
        </div>
      </div>
    </>
  );
}
