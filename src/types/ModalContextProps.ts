import InfoModalProps from "./InfoModalProps";

export default interface ModalContextProps {
  showModal: (props: InfoModalProps) => void;
  hideModal: () => void;
}
