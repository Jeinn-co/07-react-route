import { http, HttpResponse } from 'msw'
import { db } from './db'

export const handlers = [
  http.get("/api/users", () => {
    const users = db.users.getAll();
    console.log('[MSW] Handling GET /api/users', users);
    return HttpResponse.json(
      users,
      {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        }
      }
    );
  }),
  http.post("/api/users", async ({ request }) => {
    const data = await request.json();
    const newUser = db.users.create(data);
    return HttpResponse.json(newUser, { status: 201 });
  }),
  http.put("/api/users/:id", async ({ request, params }) => {
    const { id } = params;
    const data = await request.json();
    const updatedUser = db.users.update(Number(id), data);
    return HttpResponse.json(updatedUser);
  }),
  http.delete("/api/users/:id", ({ params }) => {
    const { id } = params;
    db.users.delete(Number(id));
    return new HttpResponse(null, { status: 204 });
  }),
  http.get("/api/users/:id", ({ params }) => {
    const { id } = params;
    const user = db.users.getById(Number(id));
    if (!user) {
      return HttpResponse.json({ message: "User not found" }, { status: 404 });
    }
    return HttpResponse.json(user);
  }),
  http.get("/api/posts", () => {
    const posts = db.posts.getAll();
    return HttpResponse.json(posts);
  }),
  http.get("/api/posts/:id", ({ params }) => {
    const { id } = params;
    const post = db.posts.getById(Number(id));
    if (!post) {
      return HttpResponse.json({ message: "Post not found" }, { status: 404 });
    }
    return HttpResponse.json(post);
  }),
];
 