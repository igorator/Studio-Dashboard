import axios from 'axios';
import { Project } from '../../data/types';

const API_URL = import.meta.env.API_URL || 'http://localhost:5000/projects';

export const getProjectById = async (id: string): Promise<Project | null> => {
  try {
    const response = await axios.get<Project>(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching project by ID:', error);
    throw error;
  }
};
