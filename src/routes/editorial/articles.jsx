import { useLoaderData, useLocation, matchPath, Link, useNavigate } from 'react-router-dom';

export default function UserList() {
  const users = useLoaderData();
  const location = useLocation();
  const isUserRoute = matchPath('/user/:id', location.pathname);
  const navigate = useNavigate();

  // Ensure users is always an array before calling map
  const safeUsers = Array.isArray(users) ? users : [];

  if (!users) {
    return <div>No users found or data loading...</div>;
  }

  return (
    <div>
      <button onClick={() => navigate(-1)}>Back</button>
      <h2>Users - {location.pathname}</h2>
      <ul>
        {safeUsers.map((user) => (
          <li key={user.id}>
            <Link to={`/editorial/articles/user/${user.id}`}>
              {user.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}