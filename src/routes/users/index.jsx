import { useLoaderData, useNavigate } from 'react-router-dom';
import { List } from 'antd';

export default function UserList() {
  const users = useLoaderData();
  const navigate = useNavigate();

  const safeUsers = Array.isArray(users) ? users : [];

  return (
    <List
      header={<div>Users</div>}
      bordered
      dataSource={safeUsers}
      renderItem={(user) => (
        <List.Item>
          <List.Item.Meta
            title={<a onClick={() => navigate(`/users/${user.id}`)}>{user.name}</a>}
            description={user.email}
          />
        </List.Item>
      )}
    />
  );
} 