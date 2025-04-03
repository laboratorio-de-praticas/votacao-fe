import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export const metadata = {
  title: "Votação",
  description: "Rota de votação",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className="font-verdana h-[100dvh]">
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-1">
            <main className="flex flex-col flex-grow items-center justify-start">
              <div className="flex flex-col w-5/6 my-4 md:mt-16">
                {children}
              </div>
            </main>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
