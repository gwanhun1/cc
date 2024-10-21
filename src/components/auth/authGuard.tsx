import React, { createContext, useContext, useEffect, useState } from "react";
import CustomModal from "../common/CustomModal";
import LoginPage from "./LoginPage";

interface AuthContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem("authToken");

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  useEffect(() => {
    if (!token) {
      openModal();
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
      <CustomModal isOpen={isOpen} width="sm" height="lg">
        <LoginPage closeModal={closeModal} />
      </CustomModal>
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
