import { Suspense } from 'react';
import { useLocation, matchPath } from 'react-router-dom';

export default function PageWrapper({ children }) {
  const location = useLocation();
  const isUserRoute = matchPath('/editorial/articles/user/:id', location.pathname);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <p>Is User Route: {isUserRoute ? 'Yes' : 'No'}</p>
      {children}
    </Suspense>
  );
} 