import { Request, Response } from 'express';
import { Task, tasks } from '../models/task';
import { v4 as uuidv4 } from 'uuid';

// Obtener todas las tareas
export const getAllTasks = (_req: Request, res: Response): void => {
  try {
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las tareas', error });
  }
};

// Crear una nueva tarea
export const createTask = (req: Request, res: Response): void => {
  try {
    const { title, description } = req.body;
    
    if (!title) {
      res.status(400).json({ message: 'El título es requerido' });
      return;
    }

    const newTask: Task = {
      id: uuidv4(),
      title,
      description: description || '',
      completed: false,
      createdAt: new Date()
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la tarea', error });
  }
};

// Actualizar una tarea existente
export const updateTask = (req: Request, res: Response): void => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    
    const taskIndex = tasks.findIndex(task => task.id === id);
    
    if (taskIndex === -1) {
      res.status(404).json({ message: 'Tarea no encontrada' });
      return;
    }
    
    // Actualizar solo los campos proporcionados
    if (title !== undefined) tasks[taskIndex].title = title;
    if (description !== undefined) tasks[taskIndex].description = description;
    if (completed !== undefined) tasks[taskIndex].completed = completed;
    
    res.status(200).json(tasks[taskIndex]);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la tarea', error });
  }
};

// Eliminar una tarea
export const deleteTask = (req: Request, res: Response): void => {
  try {
    const { id } = req.params;
    const taskIndex = tasks.findIndex(task => task.id === id);
    
    if (taskIndex === -1) {
      res.status(404).json({ message: 'Tarea no encontrada' });
      return;
    }
    
    const deletedTask = tasks.splice(taskIndex, 1)[0];
    res.status(200).json(deletedTask);
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la tarea', error });
  }
};
