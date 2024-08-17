import { useState } from "react";

export const useModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [onConfirm, setOnConfirm] = useState<(() => void) | null>(null);

  const openModal = (onConfirmCallback?: () => void) => {
    setOnConfirm(() => onConfirmCallback || null);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const confirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    closeModal();
  };

  return {
    isOpen,
    openModal,
    closeModal,
    confirm,
  };
};
