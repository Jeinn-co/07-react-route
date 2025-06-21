import { useLoaderData, useNavigate } from 'react-router-dom';
import { Card, Button, Typography } from 'antd';

const { Title, Paragraph } = Typography;

export default function PostDetail() {
  const post = useLoaderData();
  const navigate = useNavigate();

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div>
      <Button onClick={() => navigate('/posts')} style={{ marginBottom: 16 }}>
        Back to List
      </Button>

      <Card>
        <Title level={3}>{post.title}</Title>
        <Paragraph>{post.body}</Paragraph>
      </Card>
    </div>
  );
} 