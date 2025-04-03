import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import FeedbackModal from "./feedbackModal";
import Button from "./button";

const ConfirmModal = forwardRef(({ onConfirm }, ref) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const modalRef = useRef(null);

  useImperativeHandle(ref, () => ({
    openModal: () => {
      setIsConfirmOpen(true);
    },
    closeModal: () => setIsConfirmOpen(false),
  }));

  const handleConfirm = async () => {
    console.log("handleConfirm: Início");
    setLoading(true);
    setIsConfirmOpen(false);

    try {
      console.log("handleConfirm: Chamando onConfirm");
      const successMessage = await onConfirm(); // Chama a API correta passada na tela
      console.log("handleConfirm: onConfirm concluído com sucesso, mensagem:", successMessage);
      setTimeout(() => {
        console.log("handleConfirm: Abrindo FeedbackModal com mensagem de sucesso");
        modalRef.current?.openModal(successMessage);
      }, 100);
    } catch (errorMessage) {
      console.error("handleConfirm: onConfirm falhou, mensagem de erro:", errorMessage);
      setTimeout(() => {
        console.log("handleConfirm: Abrindo FeedbackModal com mensagem de erro");
        modalRef.current?.openModal(errorMessage);
      }, 100);
    } finally {
      console.log("handleConfirm: Fim");
      setLoading(false);
    }
  };

  return (
    <>
      {isConfirmOpen && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-[3px] md:pt-56 pt-36">
          <div className="flex flex-col items-center justify-center">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center border-4 border-[#B20000] md:w-lg md:max-w-lg w-[308px]">
              <p className="text-lg">
                {loading
                  ? "Confirmando voto..."
                  : "Tem certeza de que deseja confirmar o voto?"}
              </p>
            </div>
            {!loading && (
              <div className="flex gap-4 md:gap-9 mt-4">
                <Button
                  onClick={() => setIsConfirmOpen(false)}
                  text={"VOLTAR"}
                />
                <Button onClick={handleConfirm} text={"CONFIRMAR"} />
              </div>
            )}
          </div>
        </div>
      )}
      <FeedbackModal ref={modalRef} />
    </>
  );
});

ConfirmModal.displayName = "ConfirmModal";

export default ConfirmModal;
