export async function postLoader({ params }) {
  try {
    const response = await fetch(`/api/posts/${params.id}`);
    if (!response.ok) {
      console.error("Failed to fetch post:", response.status, response.statusText);
      return null;
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}
