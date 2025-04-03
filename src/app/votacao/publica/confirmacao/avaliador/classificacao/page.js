"use client";
import ConfirmModal from "@/components/confirmModal";
import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [acolhimento, setAcolhimento] = useState({ rating: null, comentario: "" });
  const [inovacao, setInovacao] = useState({ rating: null, comentario: "" });
  const [isCommentOpen, setIsCommentOpen] = useState(false);

  const confirmVote = async () => {
    console.log("Iniciando o envio da avaliação...");
    try {
      const payload = {
        id_avaliador: 2,
        id_projeto: 200,
        estrelas: acolhimento.rating || inovacao.rating,
      };
      console.log("Payload da requisição:", payload);

      const response = await fetch(
        "http://localhost/votacao/publica/confirmacao/avaliador/classificacao",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      console.log("Resposta da requisição recebida:", response);

      if (!response.ok) {
        throw new Error("Erro ao enviar a avaliação");
      }

      console.log("Avaliação enviada com sucesso!");
      modalRef.current.openModal();
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  const handleNextStep = () => {
    if (step === 0) {
      setStep(1);
    } else {
      const ratings = { acolhimento, inovacao };
      console.log(ratings);
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
        <div className="flex flex-col w-full justify-end bg-[#F1F1F1] drop-shadow-md rounded-2xl gap-10 p-4 pl-8 pt-10 md:w-auto">
          <span className="text-xl text-[#1A6C7C] font-bold">
            {step === 0
              ? "Como você avalia o nível de acolhimento deste projeto?"
              : "Como você avalia o nível de inovação deste projeto?"}

          </span>
          <div className="flex w-full justify-center">
            <StarRating
              rating={step === 0 ? acolhimento.rating : inovacao.rating}
              setRating={(value) =>
                step === 0
                  ? setAcolhimento({ ...acolhimento, rating: value })
                  : setInovacao({ ...inovacao, rating: value })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <span className="text-xl text-[#1A6C7C]">Comentário</span>
              <span
                className="text-[#1A6C7C] cursor-pointer select-none"
                onClick={() => setIsCommentOpen(!isCommentOpen)}
              >
                {isCommentOpen ? "Fechar" : "Opcional"}
              </span>
            </div>
            <hr />
            <textarea
              placeholder="Digite o comentário"
              className={
                isCommentOpen
                  ? `w-full bg-white rounded-xl resize-none p-2`
                  : `hidden`
              }
              rows="4"
              value={step === 0 ? acolhimento.comentario : inovacao.comentario}
              onChange={(e) =>
                step === 0
                  ? setAcolhimento({
                      ...acolhimento,
                      comentario: e.target.value,
                    })
                  : setInovacao({ ...inovacao, comentario: e.target.value })
              }
            />
          </div>
          <div className="flex w-full justify-end gap-4">
            {step > 0 ? (
              <span
                className="text-md text-[#1A6C7C] font-black cursor-pointer select-none"
                onClick={() => setStep(step - 1)}
              >
                Voltar
              </span>
            ) : (
              <span
                className="text-md text-[#1A6C7C] font-black cursor-pointer select-none"
                onClick={handleRedirect}
              >
                Sair
              </span>
            )}
            <span
              className="text-md text-[#1A6C7C] font-black cursor-pointer select-none"
              onClick={handleNextStep}
            >
              {step === 0 ? "Próximo" : "Avaliar"}
            </span>
          </div>
        </div>
      </div>
      <ConfirmModal ref={modalRef} onConfirm={confirmVote} />
    </>
  );
}
