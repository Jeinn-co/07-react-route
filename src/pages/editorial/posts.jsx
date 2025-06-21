import { useLoaderData, useNavigate } from "react-router-dom";
import { Card, Button, List } from "antd";

export default function UserPosts() {
  const posts = useLoaderData();
  const navigate = useNavigate();

  return (
    <Card title="User Posts">
      <Button onClick={() => navigate(-1)} style={{ marginBottom: 16 }}>
        Back to User
      </Button>
      <List
        itemLayout="vertical"
        dataSource={posts}
        renderItem={(post) => (
          <List.Item key={post.id}>
            <List.Item.Meta title={post.title} description={post.body} />
          </List.Item>
        )}
      />
    </Card>
  );
}
