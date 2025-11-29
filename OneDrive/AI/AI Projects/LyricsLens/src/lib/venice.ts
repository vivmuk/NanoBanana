import axios from 'axios';

// In a real deployment, this should be an environment variable.
const VENICE_API_KEY = 'lnWNeSg0pA_rQUooNpbfpPDBaj2vJnWol5WqKWrIEF';
const BASE_URL = 'https://api.venice.ai/api/v1';

export const veniceClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${VENICE_API_KEY}`,
    'Content-Type': 'application/json',
  },
});


