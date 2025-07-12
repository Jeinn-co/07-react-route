import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, Descriptions } from "antd";
import { useUser } from "../../hooks/useUsers";

export default function UserProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: user, isLoading, error } = useUser(id);

  if (isLoading) {
    return <div>載入中...</div>;
  }

  if (error) {
    return <div>載入失敗: {error.message}</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button onClick={() => navigate("/users")} style={{ marginRight: 8 }}>
          返回列表
        </Button>
        <Button 
          type="primary" 
          onClick={() => navigate(`/users/${user.id}/edit`)}
        >
          編輯使用者
        </Button>
      </div>

      <Card title={`使用者資料 - ${user.name}`}>
        <Descriptions bordered column={1}>
          <Descriptions.Item label="ID">{user.id}</Descriptions.Item>
          <Descriptions.Item label="姓名">{user.name}</Descriptions.Item>
          <Descriptions.Item label="使用者名稱">{user.username}</Descriptions.Item>
          <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
          <Descriptions.Item label="電話">{user.phone}</Descriptions.Item>
          <Descriptions.Item label="網站">{user.website}</Descriptions.Item>
          <Descriptions.Item label="公司">{user.company?.name || 'N/A'}</Descriptions.Item>
          <Descriptions.Item label="地址">
            {user.address ? `${user.address.street}, ${user.address.city}, ${user.address.zipcode}` : 'N/A'}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
}
