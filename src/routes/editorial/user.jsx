import { useParams, useLoaderData, useNavigate, useMatches, generatePath, Link, Outlet, useOutlet } from 'react-router-dom';

export default function UserProfile() {
  const { id } = useParams();
  const user = useLoaderData();
  const navigate = useNavigate();
  const matches = useMatches();
  const goToPosts = () => navigate(generatePath('/editorial/articles/user/:id/posts', { id }));
  const outlet = useOutlet();

  return (
    <div>
      {!outlet && <button onClick={() => navigate(-1)}>Back</button>}
      <p className="breadcrumb">Breadcrumbs: {matches.map((m) => m.pathname).join(' > ')}</p>
      <h2>User: {user.name} (ID: {id})</h2>
      {!outlet && <button onClick={goToPosts}>View Posts</button>}
      <Outlet />
    </div>
  );
}