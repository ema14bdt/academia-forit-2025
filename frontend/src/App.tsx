import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TaskList from './pages/TaskList';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/" element={<Navigate to="/tasks" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
