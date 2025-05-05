"use client";
import ConfirmModal from "@/components/confirmModal";
import Header from "@/components/header";
import ProjectCard from "@/components/projectCard";
import { useRef, useEffect, useState } from "react";
import Button from "@/components/button";

export default function VotacaoPublica({ idEvento, idProjeto, idVisitante }) {
  const modalRef = useRef();
  const [status, setStatus] = useState(null);
  const [projectDetails, setProjectDetails] = useState(null);

  useEffect(() => {
    if (!idEvento || !idProjeto || !idVisitante) return;

    const verifyVote = async () => {
      try {
        console.log("IDs recebidos:", idVisitante, idProjeto, idEvento);

        const verificationResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}votacao/publica/confirmacao/visitante/${idVisitante}/${idProjeto}/${idEvento}`
        );

        const verificationData = await verificationResponse.json();

        if (!verificationResponse.ok) {
          console.log("Erro na verificação do voto:", verificationData.message);
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
  }, [idEvento, idProjeto, idVisitante]);

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

  const handleConfirm = () => {
    modalRef.current.openModal();
  };

  const confirmVote = async () => {
    console.log("Iniciando o processo de confirmação de voto...");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}votacao/publica/confirmacao/visitante`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_visitante: new Number(idVisitante),
            id_projeto: new Number(idProjeto),
            id_evento: new Number(idEvento),
          }),
        }
      );

      const responseData = await response.json();
      console.log("Resposta recebida do servidor:", responseData);

      if (!response.ok) {
        console.error("Erro na resposta do servidor:", response.statusText);
        throw new Error(
          `Erro ao registrar o voto: ${
            responseData.message || "Erro desconhecido"
          }`
        );
      }

      setStatus(false);
      return responseData.message;
    } catch (error) {
      console.error("Erro ao confirmar o voto:", error);
      alert(error.message);
    }
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
          onClick={handleConfirm}
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
      <ConfirmModal ref={modalRef} onConfirm={confirmVote} />
    </>
  );
}
