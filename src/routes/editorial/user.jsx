import { useLoaderData, useNavigate, Outlet, useOutlet } from 'react-router-dom';
import { Card, Button, Descriptions } from 'antd';

export default function UserProfile() {
  const user = useLoaderData();
  const navigate = useNavigate();
  const outlet = useOutlet();

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div>
      {!outlet && (
         <Button onClick={() => navigate('/editorial/articles')} style={{ marginBottom: 16 }}>
          Back to Articles
        </Button>
      )}

      <Card title={user.name}>
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Username">{user.username}</Descriptions.Item>
          <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
          <Descriptions.Item label="Phone">{user.phone}</Descriptions.Item>
          <Descriptions.Item label="Website">{user.website}</Descriptions.Item>
        </Descriptions>
      </Card>

      <div style={{ marginTop: '20px' }}>
        {outlet ? (
          <Outlet />
        ) : (
          <Button type="primary" onClick={() => navigate('posts')}>
            View Posts
          </Button>
        )}
      </div>
    </div>
  );
}