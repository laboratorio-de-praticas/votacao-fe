"use client";
import Button from "@/components/button";
import ConfirmModal from "@/components/confirmModal";
import CongratsText from "@/components/congratsText";
import Header from "@/components/header";
import Image from "next/image";
import { useRef } from "react";

export default function VotacaoPublica() {
  const modalRef = useRef();

  const handleConfirm = () => {
    modalRef.current.openModal();
  };

  const description = "verifique abaixo se o projeto é o desejado e confirme em seguida."

  return (
    <>
      <Header text={"PROJETO"} />
      <div className="flex flex-col md:flex-row md:w-5/6 gap-8 mt-6 md:gap-12 md:mt-16 md:mb-16 md:justify-stretch md:self-center">
        <div className="order-2 w-170px w-4/5 md:w-1/3 h-fit bg-[#ffffff] rounded-b-[10px] flex flex-col shadow-gray-400 shadow-md self-center">
          <div className="w-full aspect-video bg-[#cdcdcd] border-none p-0 place-content-center">
            <Image
              src="/undefinedImage.svg"
              className="justify-self-center stroke-white w-[50px]"
              alt="Imagem do Projeto"
              width={50}
              height={50}
            />
          </div>
          <div className="flex flex-col px-5 py-3 hyphens-auto overflow-y-auto min-h-[100px] max-h-[150px] md:min-h-[150px] md:max-h-[200px]">
            <p className="text-[#004854] font-regular text-[15px] md:text-[24px]">
              {/* Nome do projeto */}
            </p>
            {/* <span className='text-[#004854] font-regular text-[24px]'>
								</span> */}
            <p className="text-[#004854] font-regular text-[10px] md:text-[18px]">
              Descrição:
              <span>{/* Descrição breve */}</span>
            </p>
          </div>
        </div>
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
