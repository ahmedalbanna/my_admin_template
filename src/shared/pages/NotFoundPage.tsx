import React from 'react';
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      title="404 – Page Not Found"
      subTitle="The page you are looking for does not exist."
      extra={<Button type="primary" onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>}
      style={{ marginTop: 80 }}
    />
  );
};

export default NotFoundPage;
