"use client";

import ConfirmModal from "@/components/confirmModal";
import FeedbackModal from "@/components/feedbackModal";
import React, { useState, useRef, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Header from "@/components/header";

const StarRating = ({ rating, setRating }) => (
  <div className="flex flex-col gap-1">
    <div className="flex gap-4">
      {[...Array(5)].map((_, i) => (
        <label key={i + 1}>
          <input
            type="radio"
            value={i + 1}
            className="hidden"
            onClick={() => setRating(i + 1)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="bi bi-star-fill cursor-pointer w-10 h-10 md:w-12 md:h-12"
            fill={i + 1 <= rating ? "#ffc107" : "#cccccc"}
            viewBox="0 0 16 16"
          >
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
          </svg>
        </label>
      ))}
    </div>
  </div>
);

export default function RatingPage() {
  const modalRef = useRef();
  const feedbackModalRef = useRef();
  const router = useRouter();
  const { idEvento, idProjeto, idPessoa } = useParams();
  const [step, setStep] = useState(0);
  const [acolhimento, setAcolhimento] = useState("");
  const [inovacao, setInovacao] = useState("");
  const [comentario, setComentario] = useState("");
  const [status, setStatus] = useState(null);

  const confirmVote = async () => {
    console.log("Iniciando o envio da avaliação...");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}votacao/publica/confirmacao/avaliador/classificacao`,

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_avaliador: new Number(idPessoa),
            id_projeto: new Number(idProjeto),
            id_evento: new Number(idEvento),
            estrelas_inovador: new Number(inovacao),
            estrelas_acolhedor: new Number(acolhimento),
            comentario: comentario,
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

      setTimeout(() => {
        router.push(`/votacao/publica/confirmacao/2/${idEvento}/${idProjeto}/${idPessoa}`);
      }, 2000);

      return responseData.message;
    } catch (error) {
      console.error("Erro ao confirmar a avaliacao:", error);
      alert(error.message);
    }
  };

  const handleNextStep = () => {
    if (step === 0) {
      acolhimento ? setStep(1) : feedbackModalRef.current?.openModal("Avalie o critério de 1 a 5 estrelas");
    } else if (step === 1) {
      inovacao ? setStep(2) : feedbackModalRef.current?.openModal("Avalie o critério de 1 a 5 estrelas");
    } else {
      modalRef.current.openModal();
    }
  };

  const handleRedirect = () => {
    router.push(`/votacao/publica/confirmacao/2/${idEvento}/${idProjeto}/${idPessoa}`);
  };

  return (
    <>
      <Header showFirstParagraph={false} text={"AVALIAÇÃO"} />
      <div className="flex flex-col md:flex-row md:w-5/6 gap-8 mt-6 md:gap-12 md:mt-16 md:mb-16 justify-center self-center">
        <div className="flex flex-col w-full justify-end bg-[#F1F1F1] drop-shadow-md rounded-2xl gap-16 p-4 pl-9 pt-14 md:w-auto">
          <div className="flex flex-col gap-16 pr-4">
            <span className="text-lg text-center text-[#1A6C7C] font-bold mb-2">
              {step === 0
                ? "Acolhimento do projeto:"
                : step === 1
                ? "Inovação do projeto:"
                : "Deixe um comentário!"}
            </span>
            {step === 2 ? (
              <input
                type="text"
                placeholder="Escreva aqui seu comentário (opcional)"
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
                className="w-full pb-2 mt-10 mb-10 text-xs md:text-base border-0 border-b-1 border-[#666666] focus:outline-none"
              />
            ) : (
              <div className="flex flex-col gap-16">
                <StarRating
                  rating={step === 0 ? acolhimento : inovacao}
                  setRating={(value) =>
                    step === 0 ? setAcolhimento(value) : setInovacao(value)
                  }
                />
                <hr className="border-[#666666]" />
              </div>
            )}
          </div>
          <div className="flex w-full justify-end gap-6">
            {step === 2 ? (
              <span
                className="text-xs md:text-base text-[#1A6C7C] font-black cursor-pointer select-none"
                onClick={() => {
                  setComentario(null);
                  handleNextStep();
                }}
              >
                Continuar sem comentar
              </span>
            ) : (
              <span
                className="text-xs md:text-base text-[#1A6C7C] font-black cursor-pointer select-none"
                onClick={handleRedirect}
              >
                Sair
              </span>
            )}
            <span
              className="text-xs md:text-base text-[#1A6C7C] font-black cursor-pointer select-none"
              onClick={handleNextStep}
            >
              {step === 2 ? "Comentar" : "Avaliar"}
            </span>
          </div>
        </div>
      </div>
      <FeedbackModal ref={feedbackModalRef} />
      <ConfirmModal ref={modalRef} onConfirm={confirmVote} />
    </>
  );
}
