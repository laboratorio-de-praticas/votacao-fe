"use client";

import React, { useRef, useState, useEffect } from "react";
import ConfirmModal from "@/components/confirmModal";
import Header from "@/components/header";
import CandidateCard from "@/components/candidateCard";
import Button from "@/components/button";
import { useParams } from "next/navigation";

const ConfirmationPage = ({ params: paramsPromise }) => {
  const { idCandidato, idEvento } = useParams();
  const [params, setParams] = useState(null);

  useEffect(() => {
    const unwrapParams = async () => {
      const resolvedParams = {
        idCandidato,
        idEvento,
      };
      setParams(resolvedParams);
    };

    unwrapParams();
  }, [idCandidato, idEvento]);

  const modalRef = useRef();
  const [status, setStatus] = useState(null);
  const [representative, setRepresentative] = useState(null);

  useEffect(() => {
    if (!params) return;

    const verifyVote = async () => {
      try {
        const verificationResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}votacao/interna/confirmacao/verificacao/${params.idCandidato}/${params.idEvento}`
        );

        const verificationData = await verificationResponse.json();

        if (!verificationResponse.ok) {
          console.error(
            "Erro na verificação do voto:",
            verificationData.message
          );
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

  useEffect(() => {
    if (!params) return;

    const fetchRepresentative = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}votacao/interna/representante/${params.idCandidato}`
        );

        const data = await response.json();

        if (!response.ok) {
          console.error("Erro ao buscar representante:", data.message);
          throw new Error(
            `Erro ao buscar representante: ${data.message || "Erro desconhecido"}`
          );
        }

        setRepresentative(data);
      } catch (error) {
        console.error("Erro ao buscar representante:", error);
        alert(error.message);
      }
    };

    fetchRepresentative();
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
      return responseData.message;
    } catch (error) {
      console.error("Erro ao confirmar o voto:", error);
      alert(error.message);
    }
  };

  return (
    <div className="p-4 md:p8 w-full lg:pt-28 lg:px-16">
      <Header text={"REPRESENTANTES"} />
      <div className="flex flex-col w-full md:px-24 gap-8 mt-6 md:gap-12 md:mt-16 md:mb-16 md:justify-stretch md:self-center">
        <div className="flex justify-center">
          {representative ? (
            <CandidateCard
              mobileImage={representative.foto_url || "/placeholder_mobile.png"}
              image={representative.foto_url || "/placeholder_desktop.png"}
              name={representative.nome}
              email={representative.email}
              room={representative.curso_semestre}
            />
          ) : (
            <p>Carregando informações do representante...</p>
          )}
        </div>
        <Button
          onClick={handleConfirm}
          text={
            status === null
              ? "CARREGANDO..."
              : status
              ? "CONFIRMAR VOTO"
              : "VOTO REGISTRADO"
          }
          status={status}
          className={"self-center"}
        ></Button>
      </div>
      <ConfirmModal ref={modalRef} onConfirm={confirmVote} />
    </div>
  );
};

export default ConfirmationPage;
