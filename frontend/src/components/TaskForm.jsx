import { useState } from 'react';

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Reciclagem'); 
    
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const novaTarefa = {
      title: title,
      category: category,
      status: false, 
    };

    onAddTask(novaTarefa); 
    setTitle('');
    setCategory('Reciclagem');
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      
      <input
        type="text"
        placeholder="Ex: Levar o lixo reciclável"
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        required
      />
      
      <select 
        value={category} 
        onChange={(e) => setCategory(e.target.value)} 
      >

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