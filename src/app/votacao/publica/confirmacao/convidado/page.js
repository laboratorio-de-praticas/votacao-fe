"use client";
import ConfirmModal from "@/components/confirmModal";
import CongratsText from "@/components/congratsText";
import Header from "@/components/header";
import ProjectCard from "@/components/projectCard";
import { useRef } from "react";

export default function VotacaoPublica() {
  const modalRef = useRef();
  const description = "verifique abaixo se o projeto é o desejado e confirme em seguida."

  const handleConfirm = () => {
    modalRef.current.openModal();
  };

  return (
    <>
      <Header text={"PROJETO"} />
      <div className="flex flex-col md:flex-row md:w-5/6 gap-8 mt-6 md:gap-12 md:mt-16 md:mb-16 md:justify-stretch md:self-center">
        <ProjectCard
          projectName={"Nome do Projeto"}
          projectDescription={"Descrição do Projeto"}
          imageUrl={"/undefinedImage.svg"}
        />
        <CongratsText
          text={description}
          onClickItem={handleConfirm}
          textButton={"VOTAR"}
        />
      </div>
      <ConfirmModal ref={modalRef} />
    </>
  );
}
