import { useLoaderData, useNavigate } from 'react-router-dom';
import { List, Button } from 'antd';

export default function UserList() {
  const users = useLoaderData();
  const navigate = useNavigate();

  const safeUsers = Array.isArray(users) ? users : [];

  return (
    <div>
      <Button onClick={() => navigate(-1)} style={{ marginBottom: 16 }}>
        Back
      </Button>
      <List
        header={<div>Users</div>}
        bordered
        dataSource={safeUsers}
        renderItem={(user) => (
          <List.Item>
            <List.Item.Meta
              title={<a onClick={() => navigate(`/editorial/articles/user/${user.id}`)}>{user.name}</a>}
              description={user.email}
            />
          </List.Item>
        )}
      />
    </div>
  );
}