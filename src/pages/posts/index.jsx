import { useLoaderData, useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { Table, Input, Button, Typography } from "antd";

const { Title, Text } = Typography;
const { Search } = Input;

export default function PostList() {
  const posts = useLoaderData();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");

  const safePosts = useMemo(
    () => (Array.isArray(posts) ? posts.map((p) => ({ ...p, key: p.id })) : []),
    [posts]
  );

  const filteredPosts = useMemo(() => {
    if (!searchText) {
      return safePosts;
    }
    return safePosts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchText.toLowerCase()) ||
        String(post.id).includes(searchText)
    );
  }, [safePosts, searchText]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "10%",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Action",
      key: "action",
      width: "15%",
      render: (_, record) => (
        <Button type="primary" onClick={() => navigate(`/posts/${record.id}`)}>
          View
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Title level={2}>All Posts</Title>
      <Search
        placeholder="Filter by ID or Title"
        onChange={(e) => setSearchText(e.target.value)}
        style={{ width: 300, marginBottom: 16 }}
        allowClear
      />
      <Text type="secondary" style={{ display: "block", marginBottom: 16 }}>
        Total {safePosts.length} posts, showing {filteredPosts.length}.
      </Text>
      <Table
        columns={columns}
        dataSource={filteredPosts}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50"],
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
        }}
        bordered
      />
    </div>
  );
}
