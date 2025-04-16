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
          <div className="flex flex-col min-h-full">
            <Navbar />
            <div className="flex flex-grow flex-shrink">
              <main className="flex flex-col flex-grow flex-shrink items-center justify-start">
                {children}
              </main>
            </div>
            <Footer />
          </div>
        </body>
      </html>
  );
}
