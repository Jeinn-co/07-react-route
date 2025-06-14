import { Navigate } from 'react-router-dom';

export default function EditorialIndex() {
  return <Navigate replace={true} to="articles" />;
}