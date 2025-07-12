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
      <Button onClick={() => navigate("/users")} style={{ marginBottom: 16 }}>
        Back to List
      </Button>

      <Card title={user.name}>
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Username">
            {user.username}
          </Descriptions.Item>
          <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
          <Descriptions.Item label="Phone">{user.phone}</Descriptions.Item>
          <Descriptions.Item label="Website">{user.website}</Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
}
