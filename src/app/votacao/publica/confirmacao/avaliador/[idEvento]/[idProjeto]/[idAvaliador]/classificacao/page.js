"use client";
 
import ConfirmModal from "@/components/confirmModal";
import React, { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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

export default function RatingPage({ params: paramsPromise }) {
  const modalRef = useRef();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [acolhimento, setAcolhimento] = useState("");
  const [inovacao, setInovacao] = useState("");
  const [comentario, setComentario] = useState("");
  const [isCommentOpen, setIsCommentOpen] = useState(false);

  const [params, setParams] = useState(null);

  useEffect(() => {
    const unwrapParams = async () => {
      const resolvedParams = await paramsPromise;
      setParams(resolvedParams);
    };

    unwrapParams();
  }, [paramsPromise]);

  const [status, setStatus] = useState(null);

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

  const confirmVote = async () => {
    if (!params) return;

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
            id_avaliador: new Number(params.idAvaliador),
            id_projeto: new Number(params.idProjeto),
            id_evento: new Number(params.idEvento),
            estrelas_inovador: new Number(inovacao),
            estrelas_acolhedor: new Number(acolhimento),
            comentario: new Text(comentario),
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
      console.error("Erro ao confirmar a avaliacao:", error);
      alert(error.message);
    }
  };

  const handleNextStep = () => {
    if (step === 0) {
      setStep(1);
    } else if (step === 1) {
      setStep(2);
    } else {
      modalRef.current.openModal();
    }
  };

  const handleRedirect = () => {
    router.push("/votacao/publica/confirmacao/avaliador");
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
                  setComentario("");
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
      <ConfirmModal ref={modalRef} onConfirm={confirmVote} />
    </>
  );
}
