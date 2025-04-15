"use client";

import React, { useRef, useState, useEffect } from "react";
import ConfirmModal from "@/components/confirmModal";
import Header from "@/components/header";
import CandidateCard from "@/components/candidateCard";
import Button from "@/components/button";

<<<<<<< HEAD:src/app/votacao/interna/confirmacao/[idEvento]/[idCandidato]/page.js
const ConfirmationPage = ({ params: paramsPromise }) => {
  const [params, setParams] = useState(null);

  useEffect(() => {
    const unwrapParams = async () => {
      const resolvedParams = await paramsPromise;
      setParams(resolvedParams);
    };

    unwrapParams();
  }, [paramsPromise]);
=======
const ConfirmationPage = () => {
  const searchParams = useSearchParams();
  const idCandidato = searchParams.get("id_candidato");
  const idEvento = searchParams.get("id_evento");
>>>>>>> 3f30fbc (refactor: remove unused router import and improve vote confirmation handling):src/app/votacao/interna/confirmacao/page.js

  const modalRef = useRef();
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (!params) return;

    const verifyVote = async () => {
      try {
        const verificationResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}votacao/interna/confirmacao/verificacao?idAluno=${params.idCandidato}&idEvento=${params.idEvento}`
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

  const handleConfirm = () => {
    modalRef.current.openModal();
  };

  const confirmVote = async () => {
    if (!params) return;

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
            idRepresentante: Number(params.idCandidato),
            idEvento: Number(params.idEvento),
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
<<<<<<< HEAD:src/app/votacao/interna/confirmacao/[idEvento]/[idCandidato]/page.js
      return responseData.message;
=======
      return(responseData.message);
>>>>>>> 3f30fbc (refactor: remove unused router import and improve vote confirmation handling):src/app/votacao/interna/confirmacao/page.js
    } catch (error) {
      console.error("Erro ao confirmar o voto:", error);
      alert(error.message);
    }
  };

  return (
    <div className="p-4 md:p8 lg:pt-8 lg:px-16">
      <Header text={"REPRESENTANTES"} />
      <div className="flex flex-col justify-center items-center gap-8 mt-16 md:mb-16">
        <CandidateCard
          mobileImage="/placeholder_mobile.png"
          image="/placeholder_desktop.png"
          name="Teste da Silva"
          email="teste@fatec.sp.gov.br"
          room="DSM 3"
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
    </div>
  );
};

export default ConfirmationPage;
