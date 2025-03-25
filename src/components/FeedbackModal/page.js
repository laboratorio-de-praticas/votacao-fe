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
    <div className="fixed inset-0 bg-white/30 backdrop-blur-[3px] flex items-start justify-center pt-10">
      <div className="relative bg-white p-6 rounded-xl shadow-lg w-80 text-center border-4 border-[#9D0000]">
        <button
          className="absolute -top-3 -right-3 w-12 h-8 flex items-center justify-center bg-white border-2 border-[#9D0000] text-[#9D0000] font-bold rounded-full shadow-md hover:bg-gray-100"
          onClick={() => setIsOpen(false)}
        >
          X
        </button>
        <p className="text-xl mt-2 md:text-lg">
          {message}
        </p>
      </div>
    </div>
  );
});

export default FeedbackModal;
