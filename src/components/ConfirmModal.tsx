// components/ConfirmModal.tsx
import { Modal, Button } from "antd";

interface ConfirmModalProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  title: string;
  content: string;
}

const ConfirmModal = ({
  visible,
  onCancel,
  onConfirm,
  title,
  content,
}: ConfirmModalProps) => {
  return (
    <Modal
      title={title}
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Hủy
        </Button>,
        <Button key="submit" type="primary" danger onClick={onConfirm}>
          Xóa
        </Button>,
      ]}
      centered
    >
      <p>{content}</p>
    </Modal>
  );
};

export default ConfirmModal;
