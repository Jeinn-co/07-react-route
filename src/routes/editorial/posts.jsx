import { useLoaderData, useNavigate, useParams } from 'react-router-dom';

export default function UserPosts() {
  const posts = useLoaderData();
  const navigate = useNavigate();
  const { id } = useParams();

  // Ensure posts is always an array before calling map
  const safePosts = Array.isArray(posts) ? posts : [];

  const firstPost = safePosts[0];

  return (
    <div>
      <button onClick={() => navigate(-1)}>Back</button>
      <h3>Posts for User: {id}</h3>
      <p>這是顯示用戶 {id} 的所有貼文的頁面。</p>
      {firstPost ? (
        <div>
          <h4>{firstPost.title}</h4>
          <p>{firstPost.body}</p>
        </div>
      ) : (
        <p>No posts found for this user.</p>
      )}
    </div>
  );
} 