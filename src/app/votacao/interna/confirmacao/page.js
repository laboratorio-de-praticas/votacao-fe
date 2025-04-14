"use client";

import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ConfirmModal from "@/components/confirmModal";
import Header from "@/components/header";
import CongratsText from "@/components/congratsText";
import CandidateCard from "@/components/candidateCard";
import { useSearchParams } from "next/navigation";

const ConfirmationPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const idCandidato = searchParams.get("id_candidato");
  const idEvento = searchParams.get("id_evento");

  const modalRef = useRef();
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const verifyVote = async () => {
      try {
        const verificationResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}votacao/interna/confirmacao/verificacao?idAluno=${idCandidato}&idEvento=${idEvento}`
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
  }, [idCandidato, idEvento]);

  const handleConfirm = () => {
    modalRef.current.openModal();
  };

  const confirmVote = async () => {
    console.log("Registrando o voto...");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}votacao/interna/confirmacao`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idAluno: 1,
            idRepresentante: Number(idCandidato),
            idEvento: Number(idEvento),
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
      alert("Voto confirmado com sucesso!");
    } catch (error) {
      console.error("Erro ao confirmar o voto:", error);
      alert(error.message);
    }
  };

  const description =
    "verifique abaixo se o projeto é o desejado e confirme em seguida.";

  return (
    <>
      <Header text={"REPRESENTANTES"} />
      <div className="flex flex-col md:flex-row md:w-5/6 gap-8 mt-6 md:gap-12 md:mt-16 md:mb-16 md:justify-stretch md:self-center">
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
          textButton={status === null ? "CARREGANDO..." : status ? "CONFIRMAR VOTO" : "VOTO REGISTRADO"}
          status={status}
        />
      </div>
      <ConfirmModal ref={modalRef} onConfirm={confirmVote} />
    </>
  );
};

export default ConfirmationPage;
