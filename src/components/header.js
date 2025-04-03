const Header = ({text}) => {
    return (
        <>
            <p className="font-sans font-regular text-left w-full text-[15px] md:text-[25px] text-[#004854] mb-[-8px] md:mb-[-16px]">
                ESCOLHA DE
            </p>
            <p className="font-sans font-bold text-left w-full text-[23px] md:text-[36px] text-[#004854]">
                {text}
            </p>
            <hr className="w-full border-[#004854] border-1" />
        </>
    );
};

export default Header;