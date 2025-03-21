import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function VotacaoInterna() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar /> {/* Barras de navegação */}
            <main className="flex flex-col items-center justify-center flex-grow">
                <h1 className="text-2xl font-bold">Página de Votação Interna</h1>
                <p className="text-gray-600">Bem-vindo à página de votação interna.</p>
            </main>
            <Footer />
        </div>
    );
}
