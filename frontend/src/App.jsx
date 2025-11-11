import { useState, useEffect, useMemo } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskStatus from './components/TaskStatus'; 
import FilterBar from './components/FilterBar'; 
import './App.css'; 

// IMPORTAÇÃO DAS FUNÇÕES DA SUA API SERVICE
import { getTasks, createTask, deleteTask } from './services/apiService'; 

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [filter, setFilter] = useState('all'); 

  // FUNÇÃO DE BUSCA (GET): Usa getTasks da Service
  const fetchTarefas = async () => {
    try {
      const data = await getTasks(); 
      setTarefas(data);
    } catch (error) {
      console.error("Erro na busca de tarefas (via getTasks): ", error);
    }
  };

  useEffect(() => {
    fetchTarefas();
  }, []);

  // FUNÇÃO DE ADIÇÃO (POST): Usa createTask da Service
  const handleAddTask = async (novaTarefa) => {
    try {
      await createTask(novaTarefa); 
      fetchTarefas(); // Recarrega a lista
    } catch (error) {
      console.error("Erro ao adicionar tarefa (via createTask): ", error);
    }
  };

  // FUNÇÃO DE DELETAR (DELETE): Usa deleteTask da Service
  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id); 
      fetchTarefas(); // Recarrega a lista
    } catch (error) {
      console.error("Erro ao deletar tarefa: ", error);
    }
  };
  
  // A função handleToggleStatus FOI REMOVIDA.
  // Se o backend não processa PUT, não a teremos no frontend.

  const filteredTasks = useMemo(() => {
    if (filter === 'all') {
      return tarefas;
    }

    // A filtragem por status ('pending' ou 'completed') só funcionará
    // se o backend estiver retornando o status correto.
    return tarefas.filter(tarefa => 
      filter === 'pending' ? !tarefa.status : 
      filter === 'completed' ? tarefa.status :
      tarefa.category === filter 
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
            
            {/* TaskStatus ainda usa 'tarefas', mas a barra de progresso
               só será precisa se o 'status' for persistido no backend */}
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
              tareças={filteredTasks} 
              onDeleteTask={handleDeleteTask} 
              // Removida a prop onToggleStatus
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
                  <p>Backend: Node.js + Express</p>
                  <p>Banco de Dados: MySQL</p>
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