import { User } from "lucide-react";
import SocialMenu from "./socialMenuResponsive"; // Menu responsivo

export default function Navbar() {
    return (
        <header>
            {/* Barra Superior: Logo SP, Social icons */}
                <div className="w-full block box-border relative z-0 bg-white text-white flex justify-between items-center border-b border-gray-300 mb-4">
                    {/* Logo SP */}
                        <div className="w-[305px] h-[80px] top-0 left-0 p-[22px_0_20px_20px] rounded-r-[50px] bg-black text-white flex justify-between items-center">
                            <img src="https://www.cps.sp.gov.br/wp-content/themes/tema-cps/images/sao-paulo/logo-governo-do-estado-sp.png" alt="São Paulo" className="h-10"/>
                        </div>
                    {/* Social icons */}
                        <SocialMenu /> {/* Menu responsivo */}
                </div>
            {/* Navbar */}
                <div className="bg-[#FF161F] text-white py-4 px-6 flex justify-between items-center">
                    {/* Logos CPS e Fatec */}
                        <div className="flex items-center space-x-4 justify-end">
                            <img src="/2024_logo_55anos_cps_gov_24-25_regua_horizontal+horizontal_br.png" alt="CPS" className="h-10 md:h-20"/>
                            <img src="/fatec_ra_registro_registro_br.png" alt="Fatec" className="h-10 md:h-20"/>
                        </div>
                    {/* Profile */}
                        <button className="bg-gray-300 text-black p-3 rounded-full flex items-center justify-center">
                            <User size={30} /> {/* Ícone de usuário */}
                        </button>
                </div>
        </header>
    );
}