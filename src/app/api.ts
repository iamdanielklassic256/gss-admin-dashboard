import axios from "axios";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT || '10000');


export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});