import { useState, useEffect } from 'react';
import { Task } from '../types/task';
import '../styles/TaskForm.css';

interface TaskFormProps {
  task?: Task;
  onSubmit: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}

const TaskForm = ({ task, onSubmit, onCancel }: TaskFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);

  // Si se proporciona una tarea, llenar el formulario con sus datos
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
      setCompleted(task.completed);
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert('El título es requerido');
      return;
    }

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      completed
    });

    // Resetear el formulario
    setTitle('');
    setDescription('');
    setCompleted(false);
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>{task ? 'Editar Tarea' : 'Nueva Tarea'}</h2>
      
      <div className="form-group">
        <label htmlFor="title">Título *</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Descripción</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
        />
      </div>

      <div className="form-group checkbox">
        <label>
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
          Completada
        </label>
      </div>

      <div className="form-actions">
        <button type="button" className="btn cancel" onClick={onCancel}>
          Cancelar
        </button>
        <button type="submit" className="btn submit">
          {task ? 'Actualizar' : 'Crear'}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
