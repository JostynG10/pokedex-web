"use client";

import React, { createContext, useContext, useState } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import InfoModal from "@/components/InfoModal";
import InfoModalProps from "@/types/InfoModalProps";
import ModalContextProps from "@/types/ModalContextProps";
import styles from "@/styles/ModalContext.module.css";

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [canHide, setCanHide] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [modalProps, setModalProps] = useState<InfoModalProps | null>(null);
  const [isHidden, setIsHidden] = useState<boolean>(true);

  const showLoading = () => {
    setLoading(true);
    setHasError(false);
    setIsHidden(false);
    setTimeout(() => setCanHide(true), 300);
  };

  const showModal = (props: InfoModalProps) => {
    setLoading(false);
    setModalProps(props);
    setIsHidden(false);
    setTimeout(() => setCanHide(true), 300);
  };

  const hideModal = () => {
    if (!canHide) return;
    setIsHidden(true);
    setCanHide(false);
    setTimeout(() => {
      setModalProps(null);
    }, 300);
  };

  const showError = () => {
    setHasError(true);
    setLoading(false);
  };

  return (
    <ModalContext.Provider
      value={{ showLoading, showModal, hideModal, showError }}
    >
      {children}
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
          {modalProps && <InfoModal {...modalProps} closeModal={hideModal} />}
          {(loading || hasError) && (
            <div className={styles.loadingContainer}>
              <div className={styles.screen}>
                <FaExclamationTriangle className={styles.screenIcon} />

                <h2 className={styles.screenMessage}>
                  {loading ? "Loading data..." : "Failed to load data."}
                </h2>
              </div>

              {hasError && (
                <button
                  onClick={hideModal}
                  type="button"
                  className={styles.closeButton}
                >
                  close
                </button>
              )}
            </div>
          )}
        </div>
      </div>
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
