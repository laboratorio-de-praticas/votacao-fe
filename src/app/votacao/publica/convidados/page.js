import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function VotacaoPublica() {
    return (
        <div className="flex flex-col p-0 w-full min-h-screen">
            <Navbar />
            <main className="flex flex-col flex-grow items-center justify-start">
                <div className="flex flex-col w-5/6 mt-8">
                    <p className="font-sans font-regular text-left w-full text-[18px] md:text-[25px] text-[#004854] mb-[-8px] md:mb-[-16px]">
                        Escolha de
                    </p>
                    <p className="font-sans font-bold text-left w-full text-[28px] md:text-[36px] text-[#004854]">
                        Projeto
                    </p>
                    <hr className="w-full border-[#004854] border-1 " />
                    <br />
                    <div className="flex flex-col md:flex-row w-full gap-10 px-4 md:mb-8">
                        <div className="order-2 w-170px md:w-1/3 h-[230px] md:h-[400px] bg-[#ffffff] rounded-b-[10px]  flex flex-col md:mb-8 shadow-gray-400 shadow-md">
                            <div className="w-full h-[130px] md:h-[180px] bg-[#cdcdcd] border-none">
                                {/* <img src="" alt="" /> */}
                            </div>
                            <div className="flex flex-col px-5 py-3 scroll-auto">
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
                        <div className="order-1 md:order-2 md:w-2/3 flex flex-col">
                            <div>
                                <p className="text-[20px] font-bold md:text-[36px] text-[#004854]">
                                    VOTO QUASE CONFIRMADO!
                                </p>
                                <p className="text-[15px] font-regular md:text-[25px] text-[#004854]">
                                    Parabéns! Seu voto está quase confirmado,
                                    verifique abaixo se o projeto é o desejado e
                                    confirme em seguida. Em breve atualizaremos
                                    você sobre o resultado da votação e quais
                                    são os melhores projetos!
                                </p>
                            </div>
                            <div className="hidden md:flex flex-row space-x-6 mt-8 ">
                                <button className="bg-[#b20000] text-white h-[50px] w-1/2 rounded-[14px] text-[25px] shadow-gray-400 shadow-md cursor-pointer trasition-all delay-100 hover:opacity-80">
                                    CONFIRMAR VOTAÇÃO
                                </button>
                                <button className="bg-[#b20000] text-white h-[50px] w-1/2 rounded-[14px] text-[25px] shadow-gray-400 shadow-md cursor-pointer trasition-all delay-100 hover:opacity-80">
                                    VOLTAR AO INÍCIO
                                </button>
                            </div>
                        </div>
                        <button className="self-center mb-8 order-3 md:hidden bg-[#b20000] text-white h-[30px] w-1/2 rounded-[14px] text-[15px] shadow-gray-400 shadow-md cursor-pointer trasition-all delay-100 hover:opacity-80">
                            CONFIRMAR
                        </button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
