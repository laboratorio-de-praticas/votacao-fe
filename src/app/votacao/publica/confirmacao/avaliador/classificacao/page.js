"use client";
import ConfirmModal from "@/components/confirmModal";
import React, { useState, useRef } from "react";

const Header = () => (
  <header className="w-full mb-4">
    <h1 className="text-[#004854] text-2xl font-bold">AVALIAÇÃO</h1>
    <hr className="border-t-2 border-[#004854] my-3" />
  </header>
);

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
  const [step, setStep] = useState(0);
  const [acolhimento, setAcolhimento] = useState({ rating: null, comentario: "" });
  const [inovacao, setInovacao] = useState({ rating: null, comentario: "" });
  const [isCommentOpen, setIsCommentOpen] = useState(false);

  const handleNextStep = () => {
    if (step === 0) {
      setStep(1);
    } else {
      const ratings = { acolhimento, inovacao };
      console.log(ratings);
      modalRef.current.openModal();
    }
  };

  return (
    <div className="flex flex-col px-6 py-6 items-center justify-center">
      <Header />
      <div className="flex flex-col w-full md:w-auto xl:w-1/3 justify-end bg-[#F1F1F1] drop-shadow-[3px_6px_4px_rgba(0,0,0,0.2)] rounded-2xl gap-10 md:gap-16 p-4 pl-8 pt-10">
        <div className="flex flex-col gap-10 pr-4 md:pr-8">
          <span className="text-xl text-[#1A6C7C] text-center font-bold">
            {step === 0
              ? "Como você avalia o nível de acolhimento deste projeto?"
              : "O quanto este projeto se destaca pela inovação?"}
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
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-end">
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
            <span className="text-md text-[#1A6C7C] font-black cursor-pointer select-none">
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

      <ConfirmModal ref={modalRef} />
    </div>
  );
}
