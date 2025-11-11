import { useState, useEffect, useMemo } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskStatus from './components/TaskStatus';
import FilterBar from './components/FilterBar';
import './App.css';
import { getTasks, createTask, deleteTask, updateTaskStatus } from './Service/ApiService';

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [filter, setFilter] = useState('all');

  const fetchTarefas = async () => {
    try {
      const data = await getTasks();
      setTarefas(data || []);
    } catch (error) {
      console.error("Erro na busca de tarefas (via getTasks): ", error);
      setTarefas([]);
    }
  };

  useEffect(() => {
    fetchTarefas();
  }, []);


  const handleAddTask = async (novaTarefa) => {
    try {
      await createTask(novaTarefa);
      fetchTarefas();
    } catch (error) {
      console.error("Erro ao adicionar tarefa (via createTask): ", error);
    }
  };


  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      fetchTarefas();
    } catch (error) {
      console.error("Erro ao deletar tarefa: ", error);
    }
  };

  const handleToggleStatus = async (id, newStatus) => {
    try {
      await updateTaskStatus(id, newStatus);
      fetchTarefas(); 
    } catch (error) {
      console.error("Erro ao atualizar status da tarefa: ", error);
    }
  };

  const filteredTasks = useMemo(() => {
    if (filter === 'all') {
      return tarefas;
    }

    return tarefas.filter(tarefa =>
      filter === 'pending' ? !tarefa.status :
        filter === 'completed' ? tarefa.status :
          tarefa.category.toLowerCase() === filter.toLowerCase()
    );
  }, [tarefas, filter]);


  return (
    <>
      <header className="main-header">
        <div className="header-content container">
          <h1 className="logo">🌱 EcoTasks</h1>
          <p className="tagline">Plataforma de Gestão de Hábitos Sustentáveis</p>
        </div>
      </header>

      <main className="app-container container">

        <div className="sidebar-column">

          <TaskStatus tarefas={tarefas} />

          <div className="form-card">
            <h3>Nova Ação Sustentável</h3>
            <TaskForm onAddTask={handleAddTask} />
          </div>
        </div>

        <div className="list-column">
          <h2>Suas Tarefas</h2>

          <FilterBar currentFilter={filter} onFilterChange={setFilter} />

          <TaskList
            tarefas={filteredTasks}
            onDeleteTask={handleDeleteTask}
            onToggleStatus={handleToggleStatus} 
          />
        </div>
      </main>

  
      <footer className="main-footer">
        <div className="footer-content container">
          <div className="footer-section brand-info">
            <h4 className="footer-logo">🌱 EcoTasks</h4>
            <p className="footer-slogan">
              A tecnologia a serviço da sustentabilidade.
            </p>
            <div className="social-icons">
              <a href="#" aria-label="GitHub"><span role="img" aria-label="GitHub">🐙</span></a>
              <a href="#" aria-label="LinkedIn"><span role="img" aria-label="LinkedIn">🔗</span></a>
            </div>
          </div>

          <div className="footer-section quick-links">
            <h5>Navegação</h5>
            <ul>
              <li><a href="#">Sobre o Projeto</a></li>
              <li><a href="#">Recursos</a></li>
              <li><a href="#">Contato</a></li>
            </ul>
          </div>

          <div className="footer-section credits">
            <h5>Tecnologias</h5>
            <p>Frontend: React (Vite)</p>
            <p>Backend: Spring Boot</p> 
            <p>Banco de Dados: H2</p> 
          </div>
        </div>

        <div className="footer-bottom">
          &copy; {new Date().getFullYear()} EcoTasks | Projeto Full Stack Acadêmico.
        </div>
      </footer>
    </>
  );
}

export default App;