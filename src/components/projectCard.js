import React from "react";
import Image from "next/image";

const ProjectCard = ({ projectName, projectDescription, imageUrl }) => {
    return (
        <div className="order-2 w-170px w-4/5 md:w-1/3 h-fit bg-[#ffffff] rounded-b-[10px] flex flex-col shadow-gray-400 shadow-md self-center">
            <div className="w-full aspect-video bg-[#cdcdcd] border-none p-0 place-content-center">
                <Image
                    src={imageUrl || "/undefinedImage.svg"}
                    className="justify-self-center stroke-white w-[50px]"
                    alt="Imagem do Projeto"
                    width={50}
                    height={50}
                />
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
        </div>
    );
};

export default ProjectCard;