export async function postLoader({ params }) {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${params.id}`,
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const post = await response.json();
    return post;
  } catch (error) {
    console.error(`Failed to fetch post with id ${params.id}:`, error);
    return null;
  }
}
