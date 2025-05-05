"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/") {
      router.push("/votacao");
    }
  }, [pathname, router]);

  return null; // Não renderiza nada enquanto redireciona
}
