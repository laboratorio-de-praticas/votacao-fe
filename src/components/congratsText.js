import React from "react";
import Button from "./button"; // Adjust the import path if necessary

const CongratsText = ({ text, onClickItem, textButton, status }) => {
    return (
      <div className="md:order-2 md:w-2/3 flex flex-col content-between">
        <div className="mb-auto">
          <p className="text-[20px] font-bold mb-2 md:mb-4 md:text-[36px] text-[#004854]">
            VOTO QUASE CONFIRMADO!
          </p>
          <p className="text-[15px] font-regular md:text-[25px] text-[#004854]">
            Parabéns! Seu voto está quase confirmado, {text}
          </p>
        </div>
        <div className="hidden md:flex flex-row space-x-6 mt-8 justify-center">
          <Button onClick={onClickItem} text={textButton} status={status} />
        </div>
      </div>
    );
};

export default CongratsText;