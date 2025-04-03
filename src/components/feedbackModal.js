import React, { useState, forwardRef, useImperativeHandle } from "react";

const FeedbackModal = forwardRef((_, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  useImperativeHandle(ref, () => ({
    openModal: (modalMessage) => {
      setMessage(modalMessage);
      setIsOpen(true);
    },
    closeModal: () => setIsOpen(false),
  }));

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white/30 backdrop-blur-[3px] flex items-start justify-center pt-80 xl:pt-36">
      <div className="relative">
        <button
          className="absolute -top-3 -right-4 z-10 w-12 h-8 flex items-center justify-center bg-[#FFFFFF] hover:bg-gray-100 border-2 border-[#B20000] text-[#B20000] font-bold rounded-full cursor-pointer"
          onClick={() => setIsOpen(false)}
        >
          X
        </button>
        <div className="relative bg-[#F8F8F8] p-8 rounded-xl shadow-lg w-80 md:w-full md:min-w-84 text-center border-4 border-[#B20000] drop-shadow-[6px_6px_3px_rgba(0,0,0,0.25)]">
          <p className="md:text-lg mt-2">{message}</p>
        </div>
      </div>
    </div>
  );
});

FeedbackModal.displayName = "FeedbackModal";

export default FeedbackModal;
