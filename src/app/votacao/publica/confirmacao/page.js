"use client";
import { useSearchParams } from "next/navigation";
import AppraiserPage from "@/components/appraiserPage";
import GuestPage from "@/components/guestPage";

export default function VotacaoPublica() {
    const searchParams = useSearchParams();
    const idTypeVotacao = searchParams.get("id_type_votacao");

    return (
        <>
            {idTypeVotacao === "1" ? (
                <GuestPage />
            ) : "2" ? (
                <AppraiserPage />
            ) : (
                ""
            )}
        </>
    );
}
