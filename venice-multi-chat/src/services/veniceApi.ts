import { ModelInfo } from '../types';

const API_KEY = 'qSXSNUAsIEo-CKXzRwgAka80w7RjW6QkiU2RlBdn_Z';
const BASE_URL = 'https://api.venice.ai/api/v1';

export const fetchModels = async (): Promise<ModelInfo[]> => {
  try {
    const response = await fetch(`${BASE_URL}/models/traits?type=text`, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`
      }
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching models:', error);
    return [];
  }
};

export const getDefaultModels = async (): Promise<Record<string, string>> => {
  try {
    const response = await fetch(`${BASE_URL}/models`, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`
      }
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.data || {};
  } catch (error) {
    console.error('Error fetching default models:', error);
    return {};
  }
}; 