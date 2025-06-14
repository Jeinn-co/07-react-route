import { useLoaderData, useLocation, matchPath, Link } from 'react-router-dom';

export default function UserList() {
  const users = useLoaderData();
  const location = useLocation();
  const isUserRoute = matchPath('/user/:id', location.pathname);

  // Ensure users is always an array before calling map
  const safeUsers = Array.isArray(users) ? users : [];

  if (!users) {
    return <div>No users found or data loading...</div>;
  }

  return (
    <div>
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
      <p>Is User Route: {isUserRoute ? 'Yes' : 'No'}</p>
    </div>
  );
}