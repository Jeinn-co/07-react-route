// API 服務
const API_BASE = '/api';

export const userApi = {
  // 取得所有使用者
  getUsers: async () => {
    const response = await fetch(`${API_BASE}/users`, { 
      cache: 'no-cache' 
    });
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return response.json();
  },

  // 取得單一使用者
  getUser: async (id) => {
    const response = await fetch(`${API_BASE}/users/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }
    return response.json();
  },

  // 建立使用者
  createUser: async (userData) => {
    const response = await fetch(`${API_BASE}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error('Failed to create user');
    }
    return response.json();
  },

  // 更新使用者
  updateUser: async ({ id, ...userData }) => {
    const response = await fetch(`${API_BASE}/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error('Failed to update user');
    }
    return response.json();
  },

  // 刪除使用者
  deleteUser: async (id) => {
    const response = await fetch(`${API_BASE}/users/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete user');
    }
    // DELETE 請求通常不回傳 JSON，所以不需要解析回應
    return { success: true };
  },
};

export const postApi = {
  // 取得所有文章
  getPosts: async () => {
    const response = await fetch(`${API_BASE}/posts`, { 
      cache: 'no-cache' 
    });
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    return response.json();
  },

  // 取得單一文章
  getPost: async (id) => {
    const response = await fetch(`${API_BASE}/posts/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch post');
    }
    return response.json();
  },
}; 