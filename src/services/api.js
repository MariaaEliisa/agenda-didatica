import axios from 'axios';

// Toda comunicação HTTP passa por esta instância centralizada.
export const api = axios.create({
  baseURL: 'https://6ada5c6d7512f497b3ffdbdc.mockapi.io',
  timeout: 12000,
  headers: { 'Content-Type': 'application/json' },
});
