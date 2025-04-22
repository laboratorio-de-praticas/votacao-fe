"use client";

import ConfirmModal from "@/components/confirmModal";
import Header from "@/components/header";
import ProjectCard from "@/components/projectCard";
import { useRef, useEffect, useState } from "react";
import Button from "@/components/button";
import { useSearchParams } from "next/navigation";

export default function GuestPage() {
  const modalRef = useRef();
  const searchParams = useSearchParams();
  const idProjeto = searchParams.get("id_projeto");
  const idEvento = searchParams.get("id_evento");
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const verifyVote = async () => {
      try {
        const verificationResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}votacao/publica/confirmacao/visitante/verificacao?id_projeto=${idProjeto}&id_evento=${idEvento}&id_visitante=1`
        );

        const verificationData = await verificationResponse.json();

        if (!verificationResponse.ok) {
          console.error("Erro na verificação:", verificationData.message);
          throw new Error(
            `Erro ao verificar: ${verificationData.message || "Erro desconhecido"}`
          );
        }

        const canVote = !verificationData.voto_confirmado;
        setStatus(canVote);
      } catch (error) {
        console.error("Erro ao verificar:", error);
        alert(error.message);
      }
    };

    verifyVote();
  }, [idProjeto, idEvento]);

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
            id_visitante: 1,
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

      console.log("Voto confirmado com sucesso!");
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  return (
    <>
      <Header text={"PROJETO"} />
      <div className="flex flex-col justify-center items-center gap-8 mt-16 md:mb-16">
        <ProjectCard
          projectName={"Nome do Projeto"}
          projectDescription={"Descrição do Projeto"}
          imageUrl={"/undefinedImage.svg"}
        />
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
