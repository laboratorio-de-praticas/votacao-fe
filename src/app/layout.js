import { Roboto_Slab, Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
});

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
        className={`${roboto.variable} antialiased h-[100dvh]`}
      >{children}
      </body>
    </html>
  );
}
