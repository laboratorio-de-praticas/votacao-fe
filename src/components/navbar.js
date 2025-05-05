import { User } from "lucide-react";
import SocialMenu from "./socialMenuMobile"; // Menu responsivo
import Image from "next/image"; 

export default function Navbar() {
    return (
      <header className="w-full">
        {/* Barra Superior: Logo SP, Social icons */}
        <div className="w-full box-border relative z-1 bg-white text-white flex justify-between items-center border-gray-300 md:pr-4">
          {/* Logo SP */}
          <div className="w-[409px] h-[98px] top-0 left-0 p-[22px_0_20px_20px] rounded-r-[50px] bg-black text-white flex justify-between items-center">
            <a href="https://www.cps.sp.gov.br" className="md:hover:opacity-80">
              <Image
                src="https://www.cps.sp.gov.br/wp-content/themes/tema-cps/images/sao-paulo/logo-rodape-governo-do-estado-sp.png"
                alt="São Paulo"
                width={220} // Defina um tamanho apropriado para otimização
                height={44}
                className="h-11"
              />
            </a>
          </div>
          {/* Social icons */}
          <SocialMenu /> {/* Menu responsivo */}
        </div>
        {/* Navbar */}
        <div className="h-[92px] bg-[#B20000] text-white py-4 md:px-6 px-2 flex justify-between items-center">
          {/* Logos CPS e Fatec */}
          <div className="flex items-center space-x-1 justify-end">
            <Image
              src="/2024_logo_55anos_cps_gov_24-25_regua_horizontal+horizontal_br.png"
              width={300}
              height={40}
              alt="CPS"
              className="h-12 md:h-20"
            />
            <Image
              src="/fatec_ra_registro_registro_br.png"
              width={120}
              height={40}
              alt="Fatec"
              className="h-8 md:h-12"
            />
          </div>
          {/* Profile */}
          <a
            href="#"
            className="bg-gray-300 text-black md:p-3 p-2 rounded-full flex items-center justify-center hover:opacity-90"
          >
            <User size={30} className="md:w-8 w-5"/> {/* Ícone de usuário */}
          </a>
        </div>
      </header>
    );
}
