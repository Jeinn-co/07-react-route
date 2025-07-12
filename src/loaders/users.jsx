export async function usersLoader() {
  try {
    const res = await fetch(`/api/users`, { cache: 'no-cache' });
    if (!res.ok) {
      console.error("Failed to fetch users:", res.status, res.statusText);
      return []; // Return an empty array on fetch error
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching users:", error);
    return []; // Return an empty array on other errors
  }
}
