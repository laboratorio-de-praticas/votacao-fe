"use client";
import Header from "@/components/header";
import { useRouter } from "next/navigation";
import CongratsText from "@/components/congratsText";
import ProjectCard from "@/components/projectCard";
import Button from "@/components/button";

export default function VotacaoPublica() {
  const router = useRouter();
  const description =
    "verifique abaixo se o projeto é o desejado e confirme em seguida.";

  const handleRedirect = () => {
    router.push("/votacao/publica/confirmacao/avaliador/classificacao");
  };

  return (
    <>
      <Header text={"PROJETO"} />
      <div className="flex flex-col md:flex-row md:w-5/6 gap-8 mt-6 md:gap-12 md:mt-16 md:mb-16 md:justify-stretch md:self-center">
        <CongratsText
          text={description}
          onClickItem={handleRedirect}
          textButton={"VOTAR"}
        />
        <ProjectCard
          projectName={"Nome do Projeto"}
          projectDescription={"Descrição do Projeto"}
          imageUrl={"/undefinedImage.svg"}
        />
        <div className="md:hidden w-full flex justify-center">
          <Button onClick={handleRedirect} text={"VOTAR"} />
        </div>
      </div>
    </>
  );
}
