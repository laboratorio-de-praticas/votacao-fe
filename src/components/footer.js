import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-black text-white p-6 text-center flex justify-center items-center w-full">
            {/* No site do cps isso é um link */}
            <a href="https://www.cps.sp.gov.br" className="md:hover:opacity-80">
                <Image
                    src="https://www.cps.sp.gov.br/wp-content/themes/tema-cps/images/sao-paulo/logo-rodape-governo-do-estado-sp.png"
                    width={220} 
                    height={44}
                    alt="São Paulo"
                    className="h-10"
                />
            </a>
        </footer>
    );
}
