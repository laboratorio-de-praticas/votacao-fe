"use client";

import React, { useRef, useState} from "react";
import ConfirmModal from "@/components/confirmModal";
import Header from "@/components/header";
import CongratsText from "@/components/congratsText";
import CandidateCard from "@/components/candidateCard";
import Button from "@/components/button";

const ConfirmationPage = () => {
  const modalRef = useRef();
  const [status, setStatus] = useState(true)

  const handleConfirm = () => {
    modalRef.current.openModal();
  };

  const confirmVote = async () => {
    try {
      console.log("Iniciando o processo de confirmação de voto...");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}votacao/interna/confirmacao`,

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idAluno: 1,
            idCandidato: 1,
            idEvento: 1,
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
      setStatus(false)
      return "Voto confirmado com sucesso!";
    } catch (error) {
      console.error("Erro ao confirmar o voto:", error);
      throw error.message;
    }
  };


  const description = "verifique abaixo se o projeto é o desejado e confirme em seguida."

  return (
    <>
      <Header text={"REPRESENTANTES"} />
      <div className="flex flex-col md:flex-row md:w-5/6 gap-8 mt-6 md:gap-12 md:mt-16 md:mb-16 md:justify-stretch md:self-center">
        <CongratsText
          text={description}
          onClickItem={handleConfirm}
          textButton={"VOTAR"}
        />
        <div className=" md:order-1 md:col-start-1 md:row-span-2 flex justify-center">
          <CandidateCard
            mobileImage="/placeholder_mobile.png"
            image="/placeholder_desktop.png"
            name="Teste da Silva"
            email="teste@fatec.sp.gov.br"
            room="DSM 3"
          />
        </div>
        <CongratsText
          text={description}
          onClickItem={handleConfirm}
          textButton={ status ? "CONFIRMAR VOTO" : "VOTO REGISTRADO"}
          status={status}
        />
      </div>
      <ConfirmModal ref={modalRef} onConfirm={confirmVote} />
    </>
  );
};

export default ConfirmationPage;
