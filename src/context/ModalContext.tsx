"use client";

import React, { createContext, useContext, useState } from "react";
import InfoModal from "@/components/InfoModal";
import InfoModalProps from "@/types/InfoModalProps";
import ModalContextProps from "@/types/ModalContextProps";
import styles from "@/styles/ModalContext.module.css";

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [modalProps, setModalProps] = useState<InfoModalProps | null>(null);
  const [isHidden, setIsHidden] = useState<boolean>(false);

  const showModal = (props: InfoModalProps) => {
    setModalProps(props);
    setIsHidden(false);
  };

  const hideModal = () => {
    setModalProps(null);
    setIsHidden(true);
  };

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      {modalProps && (
        <div
          className={`${styles.modalOverlay} ${
            !isHidden ? styles.modalOverlayVisible : ""
          }`}
          onClick={hideModal}
        >
          <div
            className={`${styles.modalContent} ${
              !isHidden ? styles.modalContentVisible : ""
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <InfoModal {...modalProps} closeModal={hideModal} />
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextProps => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal debe ser usado dentro de un ModalProvider");
  }
  return context;
};
