"use client";
import Button from "@/components/button";
import ConfirmModal from "@/components/confirmModal";
import { useRef } from "react";
import Image from "next/image";

export default function VotacaoPublica() {
    const modalRef = useRef()
    
    const handleConfirm = () => {
    modalRef.current.openModal();
    };

    return (
      <main className="flex flex-col flex-grow items-center justify-start">
        <div className="flex flex-col w-5/6 mt-4 md:mt-16">
          <p className="font-sans font-regular text-left w-full text-[15px] md:text-[25px] text-[#004854] mb-[-8px] md:mb-[-16px]">
            ESCOLHA DE
          </p>
          <p className="font-sans font-bold text-left w-full text-[23px] md:text-[36px] text-[#004854]">
            PROJETO
          </p>
          <hr className="w-full border-[#004854] border-1 " />
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
            <div className="order-1 md:order-2 md:w-2/3 flex flex-col content-between">
              <div className="mb-auto">
                <p className="text-[20px] font-bold mb-2 md:mb-4 md:text-[36px] text-[#004854]">
                  VOTO QUASE CONFIRMADO!
                </p>
                <p className="text-[15px] font-regular md:text-[25px] text-[#004854]">
                  Parabéns! Seu voto está quase confirmado, verifique abaixo se
                  o projeto é o desejado e confirme em seguida.
                </p>
              </div>
              <div className="hidden md:flex flex-row space-x-6 mt-8 justify-center">
                <Button onClick={handleConfirm} text={"VOTAR"}/>
              </div>
            </div>
          </div>
        </div>
        <ConfirmModal ref={modalRef} />
      </main>
    );
}
