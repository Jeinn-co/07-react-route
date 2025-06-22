import { http, HttpResponse } from 'msw'

let users = [
  {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
  },
  {
    id: 2,
    name: "Ervin Howell",
    username: "Antonette",
    email: "Shanna@melissa.tv",
    phone: "010-692-6593 x09125",
    website: "anastasia.net",
  },
  {
    id: 3,
    name: "Clementine Bauch",
    username: "Samantha",
    email: "Nathan@yesenia.net",
    phone: "1-463-123-4447",
    website: "ramiro.info",
  },
  {
    id: 4,
    name: "Patricia Lebsack",
    username: "Karianne",
    email: "Julianne.OConner@kory.org",
    phone: "493-170-9623 x156",
    website: "kale.biz",
  },
  {
    id: 5,
    name: "Chelsey Dietrich",
    username: "Kamren",
    email: "Lucio_Hettinger@annie.ca",
    phone: "(254)954-1289",
    website: "demarco.info",
  },
  {
    id: 6,
    name: "Mrs. Dennis Schulist",
    username: "Leopoldo_Corkery",
    email: "Karley_Dach@jasper.info",
    phone: "1-477-935-8478 x6430",
    website: "ola.org",
  },
  {
    id: 7,
    name: "Kurtis Weissnat",
    username: "Elwyn.Skiles",
    email: "Telly.Hoeger@billy.biz",
    phone: "210.067.6132",
    website: "elvis.io",
  },
  {
    id: 8,
    name: "Nicholas Runolfsdottir V",
    username: "Maxime_Nienow",
    email: "Sherwood@rosamond.me",
    phone: "586.493.6943 x140",
    website: "jacynthe.com",
  },
  {
    id: 9,
    name: "Glenna Reichert",
    username: "Delphine",
    email: "Chaim_McDermott@dana.io",
    phone: "(775)976-6794 x41206",
    website: "conrad.com",
  },
  {
    id: 10,
    name: "Clementina DuBuque",
    username: "Moriah.Stanton",
    email: "Rey.Padberg@karina.biz",
    phone: "024-648-3804",
    website: "ambrose.net",
  },
];
let nextId = 11;

export const handlers = [
  http.get("/api/users", () => {
    return HttpResponse.json(users);
  }),
  http.post("/api/users", async ({ request }) => {
    const data = await request.json();
    const now = new Date().toISOString();
    const newUser = { ...data, id: nextId++, createdAt: now };
    users = [newUser, ...users];
    return HttpResponse.json(newUser, { status: 201 });
  }),
  http.put("/api/users/:id", async ({ request, params }) => {
    const { id } = params;
    const data = await request.json();
    const now = new Date().toISOString();
    users = users.map((u) =>
      u.id === Number(id)
        ? { ...u, ...data, id: Number(id), editedAt: now }
        : u,
    );
    const updatedUser = users.find((u) => u.id === Number(id));
    return HttpResponse.json(updatedUser);
  }),
  http.delete("/api/users/:id", ({ params }) => {
    const { id } = params;
    users = users.filter((u) => u.id !== Number(id));
    return new HttpResponse(null, { status: 204 });
  }),
  http.get("/api/users/:id", ({ params }) => {
    const { id } = params;
    const user = users.find((u) => u.id === Number(id));
    if (!user) {
      return HttpResponse.json({ message: "User not found" }, { status: 404 });
    }
    return HttpResponse.json(user);
  }),
];
