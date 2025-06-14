import { useNavigate, useLocation, useSearchParams, useMatch } from 'react-router-dom';

export default function PageHome() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const match = useMatch('/editorial');

  const handleFilter = () => setSearchParams({ q: 'featured' });
  const goToArticles = () => navigate('/editorial/articles');

  return (
    <div>
      <h2>Home - {location.pathname}</h2>
      <p>Match Editorial: {match ? 'Yes' : 'No'}</p>
      <button onClick={handleFilter}>Filter: {searchParams.get('q')}</button>
      <button onClick={goToArticles}>Go to Articles</button>
    </div>
  );
}