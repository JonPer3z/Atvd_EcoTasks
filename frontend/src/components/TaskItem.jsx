// /frontend/src/components/TaskItem.jsx

// Removido onToggleStatus dos argumentos
function TaskItem({ tarefa, onDeleteTask }) { 
    
    // O status é mantido para fins de estilo (cor da borda)
    const { id, title, category, status } = tarefa;

    return (
        <div className={`task-item ${status ? 'completed' : ''}`}>
            
            {/* O Checkbox de status FOI REMOVIDO */}

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