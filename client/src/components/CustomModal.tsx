import { Button, Modal } from 'antd';
import React, { useState } from 'react';

type CustomModalProps = {
  title: string;
  message: string;
  onOkAction: () => void;
  trigger: React.ReactNode;
};

export const CustomModal: React.FC<CustomModalProps> = ({
  title,
  message,
  onOkAction,
  trigger,
}) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState(message);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    onOkAction();
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
      setModalText(message);
    }, 2000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Button danger type='link' onClick={showModal} icon={trigger} />
      <Modal
        title={title}
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
    </>
  );
};
