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
        <div className="flex flex-col p-0 w-full min-h-screen">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
