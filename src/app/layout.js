import "./globals.css";

export const metadata = {
  title: "Votação",
  description: "Rota de votação",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className="font-verdana h-[100dvh]">
        {children}
      </body>
    </html>
  );
}
