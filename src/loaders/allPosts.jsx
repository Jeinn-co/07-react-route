export async function allPostsLoader() {
  try {
    const response = await fetch("/api/posts", { cache: 'no-cache' });
    if (!response.ok) {
      console.error("Failed to fetch posts:", response.status, response.statusText);
      return [];
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}
