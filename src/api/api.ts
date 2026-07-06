import axios from 'axios';
import { POKE_API_BASE_URL } from '../constants';

export const api = axios.create({
  baseURL: POKE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
