import axios from 'axios';

// Toda comunicação HTTP passa por esta instância centralizada.
export const api = axios.create({
  baseURL: 'https://6ada42d47512f497b3ffc8e7.mockapi.io/:endpoint',
  timeout: 12000,
  headers: { 'Content-Type': 'application/json' },
});
