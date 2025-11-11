import { useState, useEffect, useMemo } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskStatus from './components/TaskStatus'; 
import FilterBar from './components/FilterBar'; 
import './App.css'; 

// IMPORTAÇÃO DAS FUNÇÕES DA SUA API SERVICE
import { getTasks, createTask, deleteTask } from './Service/ApiService'; 

function App() {
  // CORREÇÃO 1: Inicializa 'tarefas' como um array vazio [] para evitar o erro .length
  const [tarefas, setTarefas] = useState([]); 
  const [filter, setFilter] = useState('all');  

  // FUNÇÃO DE BUSCA (GET)
  const fetchTarefas = async () => {
    try {
      const data = await getTasks(); 
      // Se a service retornar undefined (o que não deveria), garantimos que é um array
      setTarefas(data || []); 
    } catch (error) {
      console.error("Erro na busca de tarefas (via getTasks): ", error);
      setTarefas([]); // Em caso de erro, define como array vazio
    }
  };

  useEffect(() => {
    fetchTarefas();
  }, []);
  
  // CORREÇÃO 2: As funções de manipulação devem ser declaradas aqui, antes do return.

  // FUNÇÃO DE ADIÇÃO (POST)
  const handleAddTask = async (novaTarefa) => {
    try {
      await createTask(novaTarefa); 
      fetchTarefas(); 
    } catch (error) {
      console.error("Erro ao adicionar tarefa (via createTask): ", error);
    }
  };

  // FUNÇÃO DE DELETAR (DELETE)
  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id); 
      fetchTarefas(); 
    } catch (error) {
      console.error("Erro ao deletar tarefa: ", error);
    }
  };
  
  // A filtragem foi mantida

  const filteredTasks = useMemo(() => {
    if (filter === 'all') {
      return tarefas;
    }

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
            
            <TaskStatus tarefas={tarefas} />

            <div className="form-card">
              <h3>Nova Ação Sustentável</h3>
              {/* handleAddTask é usado aqui */}
              <TaskForm onAddTask={handleAddTask} /> 
            </div>
        </div>

        <div className="list-column">
            <h2>Suas Tarefas</h2>
            
            <FilterBar currentFilter={filter} onFilterChange={setFilter} />

            <TaskList 
              tarefas={filteredTasks} 
              // handleDeleteTask é usado aqui
              onDeleteTask={handleDeleteTask} 
            />
        </div>
      </main>
      
      {/* ... (footer) ... */}
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