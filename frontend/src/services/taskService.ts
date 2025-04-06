import axios from 'axios';
import { Task } from '../types/task';

// Obtener la URL base desde variables de entorno
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Crear una instancia de axios
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Obtener todas las tareas
export const getAllTasks = async (): Promise<Task[]> => {
  const response = await apiClient.get<Task[]>('/tasks');
  return response.data;
};

// Crear una nueva tarea
export const createTask = async (task: Omit<Task, 'id' | 'createdAt'>): Promise<Task> => {
  const response = await apiClient.post<Task>('/tasks', task);
  return response.data;
};

// Actualizar una tarea existente
export const updateTask = async (id: string, task: Partial<Task>): Promise<Task> => {
  const response = await apiClient.put<Task>(`/tasks/${id}`, task);
  return response.data;
};

// Eliminar una tarea
export const deleteTask = async (id: string): Promise<Task> => {
  const response = await apiClient.delete<Task>(`/tasks/${id}`);
  return response.data;
};
