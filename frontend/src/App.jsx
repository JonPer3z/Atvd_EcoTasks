import { useState, useEffect, useMemo } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskStatus from './components/TaskStatus'; 
import FilterBar from './components/FilterBar'; 
import './App.css'; 

// IMPORTAÇÃO CORRIGIDA/ADICIONADA (incluindo updateTaskStatus)
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

  // FUNÇÃO DE ADIÇÃO (POST) - (Sem mudanças)
  const handleAddTask = async (novaTarefa) => {
    try {
      await createTask(novaTarefa); 
      fetchTarefas(); 
    } catch (error) {
      console.error("Erro ao adicionar tarefa (via createTask): ", error);
    }
  };

  // FUNÇÃO DE DELETAR (DELETE) - (Sem mudanças)
  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id); 
      fetchTarefas(); 
    } catch (error) {
      console.error("Erro ao deletar tarefa: ", error);
    }
  };
  
  // NOVA FUNÇÃO DE UPDATE (PUT)
  const handleToggleStatus = async (id, newStatus) => {
    try {
      await updateTaskStatus(id, newStatus);
      fetchTarefas(); // Recarrega as tarefas após a atualização
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
      // Ajustei para minúsculas para corresponder ao filtro (opcional, mas boa prática)
      tarefa.category.toLowerCase() === filter 
    );
  }, [tarefas, filter]);


  return (
    <>
      <header className="main-header">
        {/* ... (conteúdo do header) ... */}
      </header>
      
      <main className="app-container container">
        
        <div className="sidebar-column">
            {/* ... (TaskStatus e TaskForm) ... */}
        </div>

        <div className="list-column">
            <h2>Suas Tarefas</h2>
            
            <FilterBar currentFilter={filter} onFilterChange={setFilter} />

            <TaskList 
              tarefas={filteredTasks} 
              onDeleteTask={handleDeleteTask} 
              onToggleStatus={handleToggleStatus} // Passa o novo handler
            />
        </div>
      </main>
      
      {/* ... (footer) ... */}
    </>
  );
}

export default App;