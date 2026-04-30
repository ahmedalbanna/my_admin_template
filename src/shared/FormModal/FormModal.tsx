import React from 'react';
import { Modal, Form, Button, Space } from 'antd';
import type { FormInstance } from 'antd';

interface FormModalProps {
  open: boolean;
  title: string;
  onCancel: () => void;
  onFinish: (values: Record<string, unknown>) => void;
  isLoading?: boolean;
  form?: FormInstance;
  children: React.ReactNode;
  width?: number;
  okText?: string;
}

const FormModal: React.FC<FormModalProps> = ({
  open,
  title,
  onCancel,
  onFinish,
  isLoading = false,
  form: externalForm,
  children,
  width = 520,
  okText = 'Save',
}) => {
  const [internalForm] = Form.useForm();
  const form = externalForm ?? internalForm;

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  const handleOk = async () => {
    const values = await form.validateFields();
    onFinish(values);
  };

  return (
    <Modal
      open={open}
      title={title}
      onCancel={handleCancel}
      width={width}
      destroyOnClose
      footer={
        <Space>
          <Button onClick={handleCancel} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            type="primary"
            onClick={handleOk}
            loading={isLoading}
            style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', border: 'none' }}
          >
            {okText}
          </Button>
        </Space>
      }
    >
      <Form form={form} layout="vertical" onFinish={onFinish} style={{ marginTop: 16 }}>
        {children}
      </Form>
    </Modal>
  );
};

export default FormModal;
