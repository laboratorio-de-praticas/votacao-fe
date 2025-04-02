export default function Button({ text, onClick, className }) {
    return (
      <button
        className={`bg-[#9D0000] text-white rounded-[14px] text-lg md:w-60 md:h-14 w-36 h-8 shadow-gray-400 shadow-md cursor-pointer transition-all delay-100 hover:opacity-90 ${className}`}
        onClick={onClick}
      >
        {text}
      </button>
    );
}