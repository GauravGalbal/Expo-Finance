import AlertModal from '../components/AlertModal/AlertModal';


export interface AlertModalProps {
  isVisible: boolean;
  onClose: () => void;
  Title: string;
  closeIcon: string;
  Message: string;
  OkBtnText?: string;
  CancelBtnText?: string;
  onCancelPress?: () => void;
  onOkPress?: () => void;
  PrivateKey?: string;
  PrivateKeyEVM: string;
  PrivateKeySolana: string;
  
}

