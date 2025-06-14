import { useParams, useLoaderData, useNavigate, useMatches, generatePath } from 'react-router-dom';

export default function UserProfile() {
  const { id } = useParams();
  const user = useLoaderData();
  const navigate = useNavigate();
  const matches = useMatches();
  const goToPosts = () => navigate(generatePath('/user/:id/posts', { id }));

  return (
    <div>
      <h1>User: {user.name} (ID: {id})</h1>
      <button onClick={goToPosts}>View Posts</button>
      <p>Breadcrumbs: {matches.map((m) => m.pathname).join(' > ')}</p>
    </div>
  );
}