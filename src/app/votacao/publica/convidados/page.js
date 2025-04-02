"use client";

import axios from "axios";
import { useState, useRef } from "react";
import FeedbackModal from "@/components/FeedbackModal/page";
// import { useRouter } from "next/navigation";

export default function VotacaoPublica() {
    const modalRef = useRef();
    // const router = useRouter();
    // aqui é preciso pegar o eventoId, convidadoId e projetoId de onde quer que ele esteja vindo
    const [votacaoData, setVotacaoData] = useState({
        eventoId: null,
        convidadoId: null,
        projetoId: null,
    });
    // usando isSubmitting pode-se aproveitar para por um loop de loading
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitError(null);
        setIsSubmitting(true);

        // este foi só para teste da chamada do modal
        // modalRef.current.openModal("Voto enviado com sucesso!");

        try {
            const response = await axios.post(
                "http://localhost:3000/votacao/publica/convidados/confirmacao",
                votacaoData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            setSubmitSuccess(true);
            modalRef.current.openModal("Voto enviado com sucesso!");

            // seria redirecionado para alguma página aqui
            // router.push("/home");
        } catch (error) {
            setSubmitError(
                error.message ||
                    "Ocorreu um erro desconhecido ao salvar o voto."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="flex flex-col flex-grow items-center justify-start">
            <div className="flex flex-col w-5/6 mt-4 md:mt-16">
                <p className="font-sans font-regular text-left w-full text-[15px] md:text-[25px] text-[#004854] mb-[-8px] md:mb-[-16px]">
                    Escolha de
                </p>
                <p className="font-sans font-bold text-left w-full text-[23px] md:text-[36px] text-[#004854]">
                    Projeto
                </p>
                <hr className="w-full border-[#004854] border-1 " />
                <div className="flex flex-col md:flex-row md:w-5/6 gap-8 mt-6 md:gap-12 md:mt-16 md:mb-16 md:justify-stretch md:self-center">
                    <div className="order-2 w-170px w-4/5 md:w-1/3 h-fit bg-[#ffffff] rounded-b-[10px] flex flex-col shadow-gray-400 shadow-md self-center">
                        <div className="w-full aspect-video bg-[#cdcdcd] border-none p-0 place-content-center">
                            <img
                                src="/undefinedImage.svg"
                                className="justify-self-center stroke-white w-[50px]"
                                alt="Imagem do Projeto"
                            />
                            {/* <img src="" alt="" /> */}
                        </div>
                        <div className="flex flex-col px-5 py-3 hyphens-auto overflow-y-auto min-h-[100px] max-h-[150px] md:min-h-[150px] md:max-h-[200px]">
                            <p className="text-[#004854] font-regular text-[15px] md:text-[24px]">
                                {/* Nome do projeto */}
                            </p>
                            <p className="text-[#004854] font-regular text-[10px] md:text-[18px]">
                                Descrição:
                                <span>{/* Descrição breve */}</span>
                            </p>
                        </div>
                    </div>
                    <div className="order-1 md:order-2 md:w-2/3 flex flex-col content-between">
                        <div className="mb-auto">
                            <p className="text-[20px] font-bold md:text-[36px] text-[#004854]">
                                VOTO QUASE CONFIRMADO!
                            </p>
                            <p className="text-[15px] font-regular md:text-[25px] text-[#004854]">
                                Parabéns! Seu voto está quase confirmado,
                                verifique abaixo se o projeto é o desejado e
                                confirme em seguida.
                            </p>
                        </div>
                        <div>
                            <button
                                onClick={handleSubmit}
                                className="hidden md:block justify-self-center bg-[#9D0000] text-white h-[50px] w-1/3 rounded-[14px] text-[20px] shadow-gray-400 shadow-md cursor-pointer trasition-all delay-100 hover:opacity-90 "
                            >
                                VOTAR
                            </button>
                        </div>
                    </div>
                    <button
                        onClick={handleSubmit}
                        className="block md:hidden self-center mb-12 order-3 bg-[#9D0000] text-white h-[30px] w-1/2 rounded-[14px] text-[15px] shadow-gray-400 shadow-md cursor-pointer trasition-all delay-100 hover:opacity-80"
                    >
                        VOTAR
                    </button>
                </div>
            </div>
            <FeedbackModal ref={modalRef} />
        </main>
    );
}
