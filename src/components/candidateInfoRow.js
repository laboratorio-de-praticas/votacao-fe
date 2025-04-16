const CandidateInfoRow = ({ label, value, className = "" }) => (
  <p
    className={`text-[#1A6C7C] text-xs md:text-base lg:text-lg md:text-[#4A4A4A] ${className}`}
  >
    <span className="text-[#004854] hidden md:inline font-bold md:text-lg lg:text-xl mr-2">
      {label}:
    </span>
    {value}
  </p>
);

export default CandidateInfoRow;