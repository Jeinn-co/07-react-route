export async function userLoader({ params }) {
  const res = await fetch(`/api/users/${params.id}`);
  return res.json();
}
