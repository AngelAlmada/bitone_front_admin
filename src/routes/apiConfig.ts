// src/config/apiConfig.ts

const BASE_URL = "http://localhost:3000";

export const API_ROUTES = {
  AUTH_USER: `${BASE_URL}/auth/login`,
  CREATE_USER: `${BASE_URL}/create/user`,
  UPDATE_USER: (id: string) => `${BASE_URL}/create/user/${id}`,
  LIST_USER: (id: string) => `${BASE_URL}/list/users/${id}`,
  LIST_USERS: `${BASE_URL}/list/users`,
  DESACTIVATE_USER: (id: string) => `${BASE_URL}/desactivate/user/${id}`,
  LIST_DEALER: `${BASE_URL}/dealer`,
  UPDATE_DEALER: (id: string) => `${BASE_URL}/dealer/${id}`,
  ACTIVATE_DEALER: (id: string) => `${BASE_URL}/dealer/activate/${id}`
  // Agrega más rutas aquí
};
