"use client";

import { useRouter } from 'next/navigation';

export default function Votacao() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center">
      <h1>Página de Votação</h1>
      <p>Escolha o tipo de votação:</p>
      <div className="flex space-x-4 mt-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => router.push('/votacao/interna')}
        >
          Votação Interna
        </button>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded"
          onClick={() => router.push('/votacao/publica')}
        >
          Votação Pública
        </button>
      </div>
    </div>
  );
}
