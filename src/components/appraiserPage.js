"use client";
import Header from "@/components/header";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProjectCard from "@/components/projectCard";
import Button from "@/components/button";

export default function VotacaoPublica({ idEvento, idProjeto, idAvaliador }) {
  const router = useRouter();
  const [status, setStatus] = useState(null);
  const [projectDetails, setProjectDetails] = useState(null);

  useEffect(() => {
    if (!idProjeto) return;

    const fetchProjectDetails = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}votacao/publica/confirmacao/detalhes/${idProjeto}`
        );

        const data = await response.json();

        if (!response.ok) {
          console.error("Erro ao buscar detalhes do projeto:", data.message);
          throw new Error(
            `Erro ao buscar detalhes do projeto: ${data.message || "Erro desconhecido"}`
          );
        }

        setProjectDetails(data);
      } catch (error) {
        console.error("Erro ao buscar detalhes do projeto:", error);
        alert(error.message);
      }
    };

    fetchProjectDetails();
  }, [idProjeto]);

  useEffect(() => {
    if (!idEvento || !idProjeto || !idAvaliador) return;

    const verifyVote = async () => {
      try {
        const verificationResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}votacao/publica/confirmacao/avaliador/${idAvaliador}/${idProjeto}/${idEvento}`
        );

        const verificationData = await verificationResponse.json();

        if (!verificationResponse.ok) {
          console.log("Erro na verificação do voto:", verificationData.message);
          setStatus(false);
        } else {
          setStatus(true);
        }
      } catch (error) {
        console.error("Erro ao verificar o voto:", error);
        alert(error.message);
      }
    };

    verifyVote();
  }, [idEvento, idProjeto, idAvaliador]);

  const handleRedirect = () => {
    if (!idEvento || !idProjeto || !idAvaliador) return;

    router.push(
      `/votacao/publica/confirmacao/2/${idEvento}/${idProjeto}/${idAvaliador}/classificacao`
    );
  };

  return (
    <>
      <Header text={"PROJETO"} />
      <div className="flex flex-col justify-center items-center gap-8 mt-16 md:mb-16">
        {projectDetails ? (
          <ProjectCard
            projectName={projectDetails.titulo}
            projectDescription={projectDetails.descricao}
            imageUrl={projectDetails.foto_url || "/undefinedImage.svg"}
          />
        ) : (
          <p>Carregando informações do projeto...</p>
        )}
        <Button
          onClick={handleRedirect}
          text={
            status === null
              ? "CARREGANDO..."
              : status
              ? "VOTAR"
              : "VOTO REGISTRADO"
          }
          status={status}
        />
      </div>
    </>
  );
}
