"use client";

import React, { useRef } from "react";
import ConfirmModal from "@/components/confirmModal";
import Header from "@/components/header";
import CongratsText from "@/components/congratsText";
import CandidateCard from "@/components/candidateCard";

const ConfirmationPage = () => {
  const modalRef = useRef();

  const handleConfirm = () => {
    modalRef.current.openModal();
  };

  const description = "verifique ao lado se o candidato é o desejado e confirme logo abaixo. Em breve atualizaremos você sobre o resultado da votação e quem serão os novos representanetes de sua turma!"

  return (
    <>
      <Header text={"REPRESENTANTES"} />
      <div className="flex flex-col md:flex-row md:w-5/6 gap-8 mt-6 md:gap-12 md:mt-16 md:mb-16 md:justify-stretch md:self-center">
        {/* CandidateCard */}
        <div className="order-2 md:order-1 md:col-start-1 md:row-span-2 flex justify-center">
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
          textButton={"CONFIRMAR VOTO"}
        />
      </div>
      <ConfirmModal ref={modalRef} />
    </>
  );
};

export default ConfirmationPage;
