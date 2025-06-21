import { useLoaderData, useNavigate } from 'react-router-dom';
import { Card, Button, Descriptions } from 'antd';

export default function UserProfile() {
  const user = useLoaderData();
  const navigate = useNavigate();

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <Button onClick={() => navigate('/users')} style={{ marginBottom: 16 }}>
        Back to List
      </Button>

      <Card title={user.name}>
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Username">{user.username}</Descriptions.Item>
          <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
          <Descriptions.Item label="Phone">{user.phone}</Descriptions.Item>
          <Descriptions.Item label="Website">{user.website}</Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
} 