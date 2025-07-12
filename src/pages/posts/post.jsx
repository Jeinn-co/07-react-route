import { useLoaderData, Link } from "react-router-dom";
import { Card, Typography, Button } from "antd";

const { Title, Paragraph } = Typography;

export default function PostDetail() {
  const post = useLoaderData();

  if (!post) {
    return <div>Post not found.</div>;
  }

  return (
    <div>
      <Button style={{ marginBottom: 16 }}>
        <Link to="/posts">Back to Posts</Link>
      </Button>
      <Card>
        <Title level={3}>{post.title}</Title>
        <Paragraph>{post.body}</Paragraph>
      </Card>
    </div>
  );
}
