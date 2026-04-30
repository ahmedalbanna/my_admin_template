import React from 'react';
import { Popconfirm, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

interface ConfirmDeleteProps {
  onConfirm: () => void;
  loading?: boolean;
  title?: string;
  description?: string;
}

const ConfirmDelete: React.FC<ConfirmDeleteProps> = ({
  onConfirm,
  loading = false,
  title = 'Delete this record?',
  description = 'This action cannot be undone.',
}) => (
  <Popconfirm
    title={title}
    description={description}
    onConfirm={onConfirm}
    okText="Delete"
    cancelText="Cancel"
    okButtonProps={{ danger: true, loading }}
  >
    <Button type="text" danger icon={<DeleteOutlined />} size="small" />
  </Popconfirm>
);

export default ConfirmDelete;
