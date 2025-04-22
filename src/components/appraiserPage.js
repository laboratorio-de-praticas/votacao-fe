"use client";
import Header from "@/components/header";
import { useRouter, useSearchParams} from "next/navigation";
import ProjectCard from "@/components/projectCard";
import Button from "@/components/button";

export default function AppraiserPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const idProjeto = searchParams.get("id_projeto");
  const idEvento = searchParams.get("id_evento");
  
  const handleRedirect = () => {
    router.push(`/votacao/publica/confirmacao/classificacao?id_projeto=${idProjeto}&id_evento=${idEvento}&id_avaliador=1`);
  };

  return (
    <>
      <Header text={"PROJETO"} />
      <div className="flex flex-col justify-center items-center gap-8 mt-16 md:mb-16">
        <ProjectCard
          projectName={"Nome do Projeto"}
          projectDescription={"Descrição do Projeto"}
          imageUrl={"/undefinedImage.svg"}
        />
          <Button
            onClick={handleRedirect}
            text={
              "Votar"
            }
          />
      </div>

    </>
  );
}
