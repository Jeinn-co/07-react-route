// A simple in-memory database with localStorage persistence

const USERS_KEY = 'msw-mock-users';
const POSTS_KEY = 'msw-mock-posts';

// Initial data seeding
const seedInitialData = () => {
  const initialUsers = [
    { id: 1, name: 'Leanne Graham', username: 'Bret', email: 'Sincere@april.biz' },
    { id: 2, name: 'Ervin Howell', username: 'Antonette', email: 'Shanna@melissa.tv' },
    { id: 3, name: 'Clementine Bauch', username: 'Samantha', email: 'Nathan@yesenia.net' },
    { id: 4, name: 'Patricia Lebsack', username: 'Karianne', email: 'Julianne.OConner@kory.org' },
    { id: 5, name: 'Chelsey Dietrich', username: 'Kamren', email: 'Lucio_Hettinger@annie.ca' },
    { id: 6, name: 'Mrs. Dennis Schulist', username: 'Leopoldo_Corkery', email: 'Karley_Dach@jasper.info' },
    { id: 7, name: 'Kurtis Weissnat', username: 'Elwyn.Skiles', email: 'Telly.Hoeger@billy.biz' },
    { id: 8, name: 'Nicholas Runolfsdottir V', username: 'Maxime_Nienow', email: 'Sherwood@rosamond.me' },
    { id: 9, name: 'Glenna Reichert', username: 'Delphine', email: 'Chaim_McDermott@dana.io' },
    { id: 10, name: 'Clementina DuBuque', username: 'Moriah.Stanton', email: 'Rey.Padberg@karina.biz' },
  ];

  const generateMockPosts = (count) => {
    const posts = [];
    for (let i = 1; i <= count; i++) {
      posts.push({
        userId: Math.ceil(i / 3),
        id: i,
        title: `Post Title ${i}`,
        body: `This is the body content for post number ${i}.`,
      });
    }
    return posts;
  };
  
  const initialPosts = generateMockPosts(30);

  if (localStorage.getItem(USERS_KEY)) {
    console.log('[MSW DB Seeder] Found existing users in localStorage. Seeding skipped.');
  } else {
    console.log('[MSW DB Seeder] No users found in localStorage. Seeding initial users...');
    localStorage.setItem(USERS_KEY, JSON.stringify(initialUsers));
  }

  if (localStorage.getItem(POSTS_KEY)) {
    console.log('[MSW DB Seeder] Found existing posts in localStorage. Seeding skipped.');
  } else {
    console.log('[MSW DB Seeder] No posts found in localStorage. Seeding initial posts...');
    localStorage.setItem(POSTS_KEY, JSON.stringify(initialPosts));
  }
};

seedInitialData();

// --- DB Helper Functions ---

const read = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Failed to read from localStorage", e);
    return [];
  }
};

const write = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error("Failed to write to localStorage", e);
  }
};

export const db = {
  users: {
    getAll: () => read(USERS_KEY),
    getById: (id) => {
      const numericId = Number(id);
      console.log(`[MSW DB] ACTION: getById, ID: ${numericId}`);
      const users = read(USERS_KEY);
      console.log(`[MSW DB] DATA: Users currently in localStorage`, users);
      const user = users.find(user => user.id === numericId);
      console.log(`[MSW DB] RESULT: Found user:`, user);
      return user;
    },
    create: (newUser) => {
      console.log(`[MSW DB] ACTION: create, DATA:`, newUser);
      const users = read(USERS_KEY);
      const maxId = users.length > 0 ? Math.max(...users.map(u => Number(u.id))) : 0;
      const newId = maxId + 1;
      const userWithId = { ...newUser, id: newId, createdAt: new Date().toISOString() };
      const updatedUsers = [userWithId, ...users];
      console.log(`[MSW DB] About to write to localStorage. New user ID: ${newId}. Full list:`, updatedUsers);
      write(USERS_KEY, updatedUsers);
      return userWithId;
    },
    update: (id, updatedData) => {
      const numericId = Number(id);
      console.log(`[MSW DB] ACTION: update, ID: ${numericId}, DATA:`, updatedData);
      let users = read(USERS_KEY);
      let updatedUser = null;
      users = users.map(user => {
        if (user.id === numericId) {
          updatedUser = { ...user, ...updatedData, editedAt: new Date().toISOString() };
          return updatedUser;
        }
        return user;
      });
      console.log(`[MSW DB] About to write to localStorage. Updated user:`, updatedUser, `Full list:`, users);
      write(USERS_KEY, users);
      return updatedUser;
    },
    delete: (id) => {
      const numericId = Number(id);
      console.log(`[MSW DB] ACTION: delete, ID: ${numericId}`);
      let users = read(USERS_KEY);
      const initialCount = users.length;
      users = users.filter(user => user.id !== numericId);
      console.log(`[MSW DB] About to write to localStorage. Items deleted: ${initialCount - users.length}. Full list:`, users);
      write(USERS_KEY, users);
      return true;
    },
  },
  posts: {
    getAll: () => read(POSTS_KEY),
    getById: (id) => {
       const numericId = Number(id);
       return read(POSTS_KEY).find(post => post.id === numericId)
    },
  },
}; 