"use client";

import React from "react";
import Image from "next/image";

const Header = ({ children }) => (
  <header className="mb-4 md:mb-6 lg:mb-8">
    <h1 className="text-[#004854] text-xl md:text-3xl lg:text-[45px] leading-tight">
      ESCOLHA DE <span className="font-bold lg:text-[50px] block">REPRESENTANTES</span>
    </h1>
    <hr className="border-t-2 border-[#004854] my-3 md:my-6 lg:my-8" />
    {children}
  </header>
);

const CandidateInfoRow = ({ label, value, className = "" }) => (
  <p className={`text-[#1A6C7C] md:text-[#4A4A4A] ${className}`}>
    <span className="text-[#004854] hidden md:inline font-bold text-[23px] mr-2">
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
          src={mobileImage || '/placeholder_mobile.png'}
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
        className="font-bold md:font-base text-[15px] md:text-xl"
      />
      <CandidateInfoRow
        label="Email"
        value={email}
        className="text-[12px] md:text-xl"
      />
      <CandidateInfoRow
        label="Sala"
        value={room}
        className="text-[12px] md:text-xl"
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
  const handleConfirm = () => console.log("Confirmar voto");
  const handleReturn = () => console.log("Voltar ao início");

  return (
    <main className="px-4 py-6 md:px-8 md:py-12 lg:px-[166px] lg:py-[100px] max-w-[1800px] mx-auto">
      <Header>
        {/* Mobile Layout */}
        <div className="md:hidden flex flex-col items-center">
          <div className="w-full">
            <h2 className="text-[#004854] font-bold text-xl mb-3">
              VOTO QUASE CONFIRMADO!
            </h2>
            <p className="text-[#4A4A4A] text-sm mb-4 text-justify">
              Parabéns! Seu voto está quase confirmado, verifique ao lado se o candidato é o desejado e confirme logo abaixo. Em breve atualizaremos você sobre o resultado da votação e quem serão os novos representanetes de sua turma!
            </p>
          </div>

          <CandidateCard
            mobileImage="/placeholder_mobile.png"
            image="/placeholder_desktop.png"
            name="Teste da Silva"
            email="teste@fatec.sp.gov.br"
            room="DSM 3"
          />

          <div className="mt-6 w-full">
            <div className="flex flex-col gap-4">
              <ActionButton onClick={handleConfirm}>
                CONFIRMAR VOTO
              </ActionButton>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:grid md:grid-cols-[1fr_3fr] md:pt-12 md:gap-8 lg:gap-12">
          <div className="flex justify-center">
            <CandidateCard
              image="/placeholder_desktop.png"
              name="Teste da Silva"
              email="teste@fatec.sp.gov.br"
              room="DSM 3"
            />
          </div>

          <div className="flex flex-col justify-around">
            <h2 className="text-[#004854] font-bold text-3xl lg:text-[40px] mb-4">
              VOTO QUASE CONFIRMADO!
            </h2>
            
            <p className="text-[#4A4A4A] text-xl lg:text-3xl mb-8">
              Parabéns! Seu voto está quase confirmado, verifique ao lado se o candidato é o desejado e confirme logo abaixo. Em breve atualizaremos você sobre o resultado da votação e quem serão os novos representanetes de sua turma!
            </p>

            <div className="flex justify-around gap-6">
              <ActionButton onClick={handleConfirm}>
                CONFIRMAR VOTO
              </ActionButton>
              <ActionButton onClick={handleReturn} className="bg-gray-600 hover:bg-gray-700">
                VOLTAR AO INÍCIO
              </ActionButton>
            </div>
          </div>
        </div>
      </Header>
    </main>
  );
};

export default ConfirmationPage;