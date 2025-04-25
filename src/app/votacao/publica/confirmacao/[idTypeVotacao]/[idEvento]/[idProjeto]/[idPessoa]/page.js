"use client";
import { useParams } from "next/navigation";
import AppraiserPage from "@/components/appraiserPage";
import GuestPage from "@/components/guestPage";

export default function VotacaoPublica() {
    const { idTypeVotacao, idEvento, idProjeto, idPessoa } = useParams();

    return (
        <>
            {idTypeVotacao === "1" ? (
                <GuestPage
                    idEvento={idEvento}
                    idProjeto={idProjeto}
                    idVisitante={idPessoa}
                />
            ) : idTypeVotacao === "2" ? (
                <AppraiserPage
                    idEvento={idEvento}
                    idProjeto={idProjeto}
                    idAvaliador={idPessoa}
                />
            ) : (
                ""
            )}
        </>
    );
}
