import { useLoaderData, useNavigate } from "react-router-dom";
import { Card, Button, Descriptions, Space, Tag } from "antd";
import { ArrowLeftOutlined, EditOutlined } from "@ant-design/icons";

export default function UserProfile() {
  const user = useLoaderData();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div style={{ textAlign: 'center', padding: '48px 0' }}>
        <h2>User not found</h2>
        <Button onClick={() => navigate("/users")}>
          Back to List
        </Button>
      </div>
    );
  }

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={() => navigate("/users")}
        >
          Back to List
        </Button>
        <Button 
          type="primary" 
          icon={<EditOutlined />}
          onClick={() => navigate(`/users/${user.id}/edit`)}
        >
          Edit User
        </Button>
      </Space>

      <Card 
        title={
          <Space>
            <span>{user.name}</span>
            <Tag color="blue">ID: {user.id}</Tag>
          </Space>
        }
        style={{ maxWidth: 800 }}
      >
        <Descriptions bordered column={1} size="middle">
          <Descriptions.Item label="Username">
            <strong>{user.username}</strong>
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            <a href={`mailto:${user.email}`}>{user.email}</a>
          </Descriptions.Item>
          <Descriptions.Item label="Phone">
            {user.phone || <span style={{ color: '#999' }}>Not provided</span>}
          </Descriptions.Item>
          <Descriptions.Item label="Website">
            {user.website ? (
              <a href={user.website} target="_blank" rel="noopener noreferrer">
                {user.website}
              </a>
            ) : (
              <span style={{ color: '#999' }}>Not provided</span>
            )}
          </Descriptions.Item>
          {user.createdAt && (
            <Descriptions.Item label="Created At">
              {new Date(user.createdAt).toLocaleDateString()}
            </Descriptions.Item>
          )}
          {user.editedAt && (
            <Descriptions.Item label="Last Edited">
              {new Date(user.editedAt).toLocaleDateString()}
            </Descriptions.Item>
          )}
        </Descriptions>
      </Card>
    </div>
  );
}
