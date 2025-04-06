import { Task } from '../types/task';
import '../styles/TaskItem.css';

interface TaskItemProps {
  task: Task;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string, completed: boolean) => void;
  onEdit: (task: Task) => void;
}

const TaskItem = ({ task, onDelete, onToggleComplete, onEdit }: TaskItemProps) => {
  const handleToggleComplete = () => {
    onToggleComplete(task.id, !task.completed);
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        <h3 className="task-title">{task.title}</h3>
        <p className="task-description">{task.description}</p>
        <p className="task-date">
          Creado: {new Date(task.createdAt).toLocaleDateString()}
        </p>
      </div>
      <div className="task-actions">
        <label className="task-checkbox">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleToggleComplete}
          />
          Completada
        </label>
        <button className="btn edit" onClick={() => onEdit(task)}>
          Editar
        </button>
        <button className="btn delete" onClick={() => onDelete(task.id)}>
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
