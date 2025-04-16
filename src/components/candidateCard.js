import CandidateInfoRow from "@/components/candidateInfoRow";
import Image from "next/image";

const CandidateCard = ({ image, mobileImage, name, email, room }) => (
  <article className="w-full max-w-[171px] md:max-w-[336px] lg:max-h-[406px] xl:max-h-none bg-white rounded-b-[14px] shadow-lg hover:shadow-xl transition-shadow">
    <div className="relative aspect-square md:aspect-[336/242]">
      <div className=" w-full h-full">
        <Image
          src={image}
          alt={`Foto do candidato ${name}`}
          fill
          className="object-cover"
          sizes="(min-width: 768px) 386px"
          priority
        />
      </div>
    </div>
    <div className="p-4 md:p-6 space-y-2 md:space-y-3">
      <CandidateInfoRow
        label="Nome"
        value={name}
        className="font-bold text-base!"
      />
      <CandidateInfoRow label="Email" value={email} />
      <CandidateInfoRow label="Sala" value={room} />
    </div>
  </article>
);

export default CandidateCard;