export async function postsLoader({ params }) {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${params.id}/posts`);
    if (!res.ok) {
      console.error('Failed to fetch posts:', res.status, res.statusText);
      return [];
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
} 