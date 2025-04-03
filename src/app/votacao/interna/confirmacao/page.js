"use client";

import React, { useRef } from "react";
import Image from "next/image";
import ConfirmModal from "@/components/confirmModal";
import Button from "@/components/button";
import Header from "@/components/header";

const CandidateInfoRow = ({ label, value, className = "" }) => (
  <p className={`text-[#1A6C7C] text-[10px] md:text-base lg:text-lg md:text-[#4A4A4A] ${className}`}>
    <span className="text-[#004854] hidden md:inline font-bold md:text-lg lg:text-xl mr-2">
      {label}:
    </span>
    {value}
  </p>
);

const CandidateCard = ({ image, mobileImage, name, email, room }) => (
  <article className="w-full max-w-[171px] md:max-w-[336px] lg:max-h-[406px] xl:max-h-none bg-white rounded-b-[14px] shadow-lg hover:shadow-xl transition-shadow">
    <div className="relative aspect-square md:aspect-[336/242]">
      {/* Mobile Image */}
      <div className="md:hidden w-full h-full">
        <Image
          src={mobileImage || "/placeholder_mobile.png"}
          alt={`Foto do candidato ${name}`}
          fill
          className="object-cover rounded-t-[14px]"
          sizes="(max-width: 768px) 171px"
          priority
        />
      </div>

      {/* Desktop Image */}
      <div className="hidden md:block w-full h-full">
        <Image
          src={image}
          alt={`Foto do candidato ${name}`}
          fill
          className="object-cover"
          sizes="(min-width: 768px) 386px"
          priority
        />
      </div>
    </div>
    <div className="p-4 md:p-6 space-y-2 md:space-y-3">
      <CandidateInfoRow
        label="Nome"
        value={name}
        className="font-bold text-base!"
      />
      <CandidateInfoRow
        label="Email"
        value={email}
      />
      <CandidateInfoRow
        label="Sala"
        value={room}
      />
    </div>
  </article>
);

const ActionButton = ({ children, onClick, className = "" }) => (
  <button
    onClick={onClick}
    className={`px-6 py-2 bg-[#9D0000] hover:bg-[#a31515] text-white rounded-[14px] 
      text-sm md:text-xl xl:text-2xl shadow-md hover:shadow-lg transition-all
      ${className}`}
  >
    {children}
  </button>
);

const ConfirmationPage = () => {
  const modalRef = useRef();

  const handleConfirm = () => {
    modalRef.current.openModal();
  };
  
  const handleReturn = () => console.log("Voltar ao início");

  return (
    <main className="px-4 py-6 md:px-8 md:py-12 lg:px-[166px] lg:py-[100px] max-w-[1800px] mx-auto">
      <Header text={"REPRESENTANTES"} />
      <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-[auto_auto] md:gap-8 md:pt-12">
        {/* Texto */}
        <div className="order-1 md:order-2 md:col-start-2 md:row-start-1">
          <h2 className="text-[#004854] font-bold text-base md:text-3xl lg:text-4xl mb-2 md:mb-4">
            VOTO QUASE CONFIRMADO!
          </h2>
          <p className="text-[#4A4A4A] text-base md:text-lg lg:text-xl mb-12 text-justify">
            Parabéns! Seu voto está quase confirmado, verifique ao lado se o
            candidato é o desejado e confirme logo abaixo. Em breve
            atualizaremos você sobre o resultado da votação e quem serão os
            novos representanetes de sua turma!
          </p>
        </div>

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

        {/* Botões */}
        <div className="order-3 mt-3 md:order-2 md:col-start-2 md:row-start-2 flex justify-around gap-6">
          <Button onClick={handleConfirm} text={"CONFIRMAR VOTO"} />
        </div>
        <ConfirmModal ref={modalRef} />
      </div>
    </main>
  );
};

export default ConfirmationPage;
