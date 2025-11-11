import { useState } from 'react';

function TaskForm({ onAddTask }) {
  // 1. ESTADOS RENOMEADOS para corresponder ao formato da API
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Reciclagem'); // Valor inicial capitalizado
    
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    // 2. OBJETO DE ENVIO CORRIGIDO para incluir status e usar nomes em inglês
    const novaTarefa = {
      title: title,
      category: category,
      status: false, // Tarefa recém-criada é sempre PENDENTE
    };

    onAddTask(novaTarefa); 

    // Limpar o formulário
    setTitle('');
    setCategory('Reciclagem');
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      {/* <h3>Adicionar Nova Tarefa</h3> (Removido, já está no App.jsx) */}
      
      <input
        type="text"
        placeholder="Ex: Levar o lixo reciclável"
        value={title} // Estado de valor renomeado
        onChange={(e) => setTitle(e.target.value)} // Setter renomeado
        required
      />
      
      <select 
        value={category} // Estado de valor renomeado
        onChange={(e) => setCategory(e.target.value)} // Setter renomeado
      >
        {/* 3. VALORES AJUSTADOS para corresponder ao formatado do CSS/Service */}
        <option value="Reciclagem">Reciclagem</option>
        <option value="Alimentacao">Alimentação</option>
        <option value="Energia">Energia</option>
        <option value="Outros">Outros</option>
      </select>
      
      <button type="submit">Adicionar Tarefa Sustentável</button>
    </form>
  );
}

export default TaskForm;