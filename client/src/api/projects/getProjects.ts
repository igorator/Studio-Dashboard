import axios from 'axios';
import { Project } from '../../data/types';

const API_URL = import.meta.env.API_URL || 'http://localhost:5000/projects';

export const getProjects = async (): Promise<Project[]> => {
  try {
    const response = await axios.get<Project[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};
