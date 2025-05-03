import React from "react";
import Image from "next/image";

const ProjectCard = ({ projectName, projectDescription, imageUrl }) => {
    return (
      <article className="w-full max-w-[220px] md:max-w-[370px] lg:max-h-[450px] xl:max-h-none bg-white rounded-b-[14px] shadow-lg hover:shadow-xl transition-shadow">
        <div className="relative aspect-square md:aspect-[336/242]">
          <div className=" w-full h-full">
            <Image
              src={imageUrl}
              alt={`Foto do projeto: ${projectName}`}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 386px"
              priority
            />
          </div>
        </div>
        <div className="flex flex-col px-5 py-3 hyphens-auto overflow-y-auto min-h-[100px] max-h-[150px] md:min-h-[150px] md:max-h-[200px]">
          <p className="text-[#004854] font-bold text-lg md:text-xl">
            {projectName || "Nome do projeto"}
          </p>
          <p className="text-[#004854] font-bold text-sm md:text-lg">
            Descrição:
            <span className="font-medium">
              &nbsp;{projectDescription || "Descrição breve"}
            </span>
          </p>
        </div>
      </article>
    );
};

export default ProjectCard;