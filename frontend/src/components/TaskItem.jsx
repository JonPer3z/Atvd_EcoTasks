// /frontend/src/components/TaskItem.jsx

// Adicionado onToggleStatus
function TaskItem({ tarefa, onDeleteTask, onToggleStatus }) { 
    
    // As props (title, category, status) agora virão corretas do ApiService
    const { id, title, category, status } = tarefa;

    return (
        <div className={`task-item ${status ? 'completed' : ''}`}>
            
            {/* Checkbox de status RE-ADICIONADO */}
            <input 
              type="checkbox"
              className="task-checkbox" // Você pode querer estilizar isso no App.css
              checked={status}
              onChange={() => onToggleStatus(id, !status)} // Chama a função do App.jsx
            />

            <div className="task-content">
                <span className="task-title">{title}</span> 
                <span className={`task-category category-${category}`}>
                    {category}
                </span>
            </div>

            <button 
                className="delete-btn" 
                onClick={() => onDeleteTask(id)}
            >
                🗑️
            </button>
        </div>
    );
}

export default TaskItem;