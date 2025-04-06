import { useState, useEffect } from 'react';
import { Task } from '../types/task';
import TaskItem from '../components/TaskItem';
import TaskForm from '../components/TaskForm';
import { getAllTasks, createTask, updateTask, deleteTask } from '../services/taskService';
import '../styles/TaskList.css';

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Cargar las tareas al montar el componente
  useEffect(() => {
    fetchTasks();
  }, []);

  // Función para obtener todas las tareas
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await getAllTasks();
      setTasks(data);
      setError(null);
    } catch (err) {
      console.error('Error al cargar las tareas:', err);
      setError('Error al cargar las tareas. Por favor, intente de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  // Función para crear una nueva tarea
  const handleCreateTask = async (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    try {
      const newTask = await createTask(taskData);
      setTasks([...tasks, newTask]);
      setIsFormOpen(false);
    } catch (err) {
      console.error('Error al crear la tarea:', err);
      setError('Error al crear la tarea. Por favor, intente de nuevo.');
    }
  };

  // Función para actualizar una tarea existente
  const handleUpdateTask = async (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    if (!editingTask) return;
    
    try {
      const updatedTask = await updateTask(editingTask.id, taskData);
      setTasks(tasks.map(task => 
        task.id === editingTask.id ? updatedTask : task
      ));
      setEditingTask(null);
      setIsFormOpen(false);
    } catch (err) {
      console.error('Error al actualizar la tarea:', err);
      setError('Error al actualizar la tarea. Por favor, intente de nuevo.');
    }
  };

  // Función para eliminar una tarea
  const handleDeleteTask = async (id: string) => {
    if (!confirm('¿Está seguro de que desea eliminar esta tarea?')) return;
    
    try {
      await deleteTask(id);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      console.error('Error al eliminar la tarea:', err);
      setError('Error al eliminar la tarea. Por favor, intente de nuevo.');
    }
  };

  // Función para cambiar el estado de completado de una tarea
  const handleToggleComplete = async (id: string, completed: boolean) => {
    try {
      const updatedTask = await updateTask(id, { completed });
      setTasks(tasks.map(task => 
        task.id === id ? updatedTask : task
      ));
    } catch (err) {
      console.error('Error al actualizar el estado de la tarea:', err);
      setError('Error al actualizar el estado de la tarea. Por favor, intente de nuevo.');
    }
  };

  // Función para abrir el formulario de edición
  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  return (
    <div className="task-list-container">
      <header>
        <h1>Lista de Tareas</h1>
        <button 
          className="btn new-task" 
          onClick={() => {
            setEditingTask(null);
            setIsFormOpen(true);
          }}
        >
          Nueva Tarea
        </button>
      </header>

      {error && <div className="error-message">{error}</div>}

      {isFormOpen && (
        <div className="modal">
          <div className="modal-content">
            <TaskForm 
              task={editingTask || undefined}
              onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
              onCancel={() => {
                setIsFormOpen(false);
                setEditingTask(null);
              }}
            />
          </div>
        </div>
      )}

      {loading ? (
        <div className="loading">Cargando tareas...</div>
      ) : tasks.length === 0 ? (
        <div className="empty-list">No hay tareas. ¡Crea una nueva!</div>
      ) : (
        <div className="task-list">
          {tasks.map(task => (
            <TaskItem 
              key={task.id}
              task={task}
              onDelete={handleDeleteTask}
              onToggleComplete={handleToggleComplete}
              onEdit={handleEditTask}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
