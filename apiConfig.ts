// src/config/apiConfig.ts

const BASE_URL = "http://localhost:3000";

export const API_ROUTES = {
  CREATE_USER: `${BASE_URL}/create/user`,
  LIST_USER: (id: string) => `${BASE_URL}/list/users/${id}`,
  // Agrega más rutas aquí
};
