import { Roboto_Slab } from "next/font/google";
import "./globals.css";

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
});

export const metadata = {
  title: "Votação",
  description: "Rota de votação",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body
        cz-shortcut-listen="true"
        className={`${robotoSlab.className} h-[100dvh}`}
      >
        {children}
      </body>
    </html>
  );
}
