import InfoModalProps from "./InfoModalProps";

export default interface ModalContextProps {
  showLoading: () => void;
  showModal: (props: InfoModalProps) => void;
  hideModal: () => void;
  showError: () => void;
}
