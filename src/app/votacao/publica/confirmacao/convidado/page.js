"use client";
import ConfirmModal from "@/components/confirmModal";
import CongratsText from "@/components/congratsText";
import Header from "@/components/header";
import ProjectCard from "@/components/projectCard";
import { useRef } from "react";
import Button from "@/components/button";

export default function VotacaoPublica() {
  const modalRef = useRef();
  const description = "verifique abaixo se o projeto é o desejado e confirme em seguida."

  const handleConfirm = () => {
    modalRef.current.openModal();
  };

  const confirmVote = async () => {
    console.log("Iniciando o processo de confirmação de voto...");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}votacao/publica/confirmacao/convidado`,

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_visitante: 1,
            id_candidato: 1,
            id_evento: 2,
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
      return "Voto confirmado com sucesso!";
    } catch (error) {
      console.error("Erro na requisição:", error);
      throw error.message;
    }
  };

  return (
    <>
      <Header text={"PROJETO"} />
      <div className="flex flex-col md:flex-row md:w-5/6 gap-8 mt-6 md:gap-12 md:mt-16 md:mb-16 md:justify-stretch md:self-center">
        <CongratsText
          text={description}
          onClickItem={handleConfirm}
          textButton={"VOTAR"}
        />
        <ProjectCard
          projectName={"Nome do Projeto"}
          projectDescription={"Descrição do Projeto"}
          imageUrl={"/undefinedImage.svg"}
        />
        <div className="md:hidden w-full flex justify-center">
          <Button onClick={handleConfirm} text={"VOTAR"} />
        </div>
      </div>
      <ConfirmModal ref={modalRef} onConfirm={confirmVote} />
    </>
  );
}
