import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import FeedbackModal from "./feedbackModal";

const ConfirmModal = forwardRef((_, ref) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const modalRef = useRef(null);

  useImperativeHandle(ref, () => ({
    openModal: () => {
      setIsConfirmOpen(true);
    },
    closeModal: () => setIsConfirmOpen(false),
  }));

  // Simulação de chamada de API
  const mockApiCall = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const success = Math.random() > 0.5; // 50% chance de sucesso
        success
          ? resolve("Voto confirmado com sucesso!")
          : reject("Erro ao confirmar o voto.");
      }, 100);
    });
  };

  const handleConfirm = async () => {
    setIsConfirmOpen(false);

    try {
      const successMessage = await mockApiCall();
      setTimeout(() => {
        modalRef.current?.openModal(successMessage);
      }, 100);
    } catch (errorMessage) {
      setTimeout(() => {
        modalRef.current?.openModal(errorMessage);
      }, 100);
    }
  };

  return (
    <>
      {isConfirmOpen && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-[3px] md:pt-56 pt-36">
          <div className="flex flex-col items-center justify-center">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center border-4 border-[#B20000] md:w-lg md:max-w-lg w-[308px]">
              <p className="text-lg">
                Tem certeza de que deseja confirmar o voto?
              </p>
            </div>
            <div className="flex gap-4 md:gap-9 mt-4 md:gap">
              <button
                className="bg-[#B20000] text-white rounded-xl shadow-md hover:bg-[#9A0101] md:w-60 md:h-14 w-36 h-8 transition-colors duration-300"
                onClick={() => setIsConfirmOpen(false)}
              >
                <p className="text-lg">VOLTAR</p>
              </button>
              <button
                className="bg-[#B20000] text-white rounded-xl shadow-md hover:bg-[#9A0101] md:w-60 md:h-14 w-36 h-8 transition-colors duration-300"
                onClick={handleConfirm}
              >
                <p className="text-lg">CONFIRMAR</p>
              </button>
            </div>
          </div>
        </div>
      )}
      <FeedbackModal ref={modalRef} />
    </>
  );
});

ConfirmModal.displayName = "ConfirmModal";

export default ConfirmModal;
