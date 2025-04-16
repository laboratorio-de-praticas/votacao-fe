'use client';
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center">
      <h1>Página de Votação Interna</h1>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => router.push("/votacao/interna/confirmacao/1/1")}
      >
        Confirmação evento 1
      </button>
    </div>
  );
}
