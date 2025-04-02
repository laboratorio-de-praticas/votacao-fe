"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function SocialMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Botão para mobile */}
      <button
        className="mr-4 md:hidden p-2 text-gray-600 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Ícones das redes sociais */}
      <div
        className={`
          flex flex-col md:flex-row md:align-center 
          absolute md:static top-16 right-0 
          bg-white md:bg-transparent 
          p-4 md:p-0 
          rounded-lg shadow-gray-400 shadow-md md:shadow-none 
          transition-all duration-300
          ${isOpen ? "block" : "hidden md:flex"}
        `}
      >
        <a href="#">
          <Image
            width={24}
            height={30}
            src="https://www.cps.sp.gov.br/wp-content/themes/tema-cps/images/sao-paulo/i-flickr.png"
            alt="Flicker"
            className="md:h-6  md:w-7 pt-1 md:pt-0 md:pl-1 hover:my-[1px] md:hover:mx-[1px] md:hover:my-0 hover:opacity-80"
          />
        </a>
        <a href="#">
          <Image
            width={24}
            height={30}
            src="https://www.cps.sp.gov.br/wp-content/themes/tema-cps/images/sao-paulo/i-linkedin.png"
            alt="Linkedin"
            className="md:h-6  md:w-7 pt-1 md:pt-0 md:pl-1 hover:my-[1px] md:hover:mx-[1px] md:hover:my-0 hover:opacity-80"
          />
        </a>
        <a href="#">
          <Image
            width={24}
            height={30}
            src="https://www.cps.sp.gov.br/wp-content/themes/tema-cps/images/sao-paulo/i-tiktok.png"
            alt="TikTok"
            className="md:h-6  md:w-7 pt-1 md:pt-0 md:pl-1 hover:my-[1px] md:hover:mx-[1px] md:hover:my-0 hover:opacity-80"
          />
        </a>
        <a href="#">
          <Image
            width={24}
            height={30}
            src="https://www.cps.sp.gov.br/wp-content/themes/tema-cps/images/sao-paulo/i-youtube.png"
            alt="Youtube"
            className="md:h-6  md:w-7 pt-1 md:pt-0 md:pl-1 hover:my-[1px] md:hover:mx-[1px] md:hover:my-0 hover:opacity-80"
          />
        </a>
        <a href="#">
          <Image
            width={24}
            height={30}
            src="https://www.cps.sp.gov.br/wp-content/themes/tema-cps/images/sao-paulo/i-twitter.png"
            alt="X(Twitter)"
            className="md:h-6  md:w-7 pt-1 md:pt-0 md:pl-1 hover:my-[1px] md:hover:mx-[1px] md:hover:my-0 hover:opacity-80"
          />
        </a>
        <a href="#">
          <Image
            width={24}
            height={30}
            src="https://www.cps.sp.gov.br/wp-content/themes/tema-cps/images/sao-paulo/i-insta.png"
            alt="Instagram"
            className="md:h-6  md:w-7 pt-1 md:pt-0 md:pl-1 hover:my-[1px] md:hover:mx-[1px] md:hover:my-0 hover:opacity-80"
          />
        </a>
        <a href="#">
          <Image
            width={24}
            height={30}
            src="https://www.cps.sp.gov.br/wp-content/themes/tema-cps/images/sao-paulo/i-facebook.png"
            alt="Facebook"
            className="md:h-6 md:w-7 pt-1 md:pt-0 md:pl-1 hover:my-[1px] md:hover:mx-[1px] md:hover:my-0 hover:opacity-80"
          />
        </a>
        <p className="text-[#808080] text-[14px] mt-1 md:mt-0 md:ml-2">
          /governosp
        </p>
      </div>
    </div>
  );
}
