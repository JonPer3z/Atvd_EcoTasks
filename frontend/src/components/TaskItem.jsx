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
                className="task-checkbox" // Você pode estilizar isso no App.css
                checked={status}
                onChange={() => onToggleStatus(id, !status)} // Chama a função do App.jsx
                style={{ marginRight: '1rem', cursor: 'pointer' }} // Estilo rápido
            />

            <div className="task-content">
                <span className="task-title">{title}</span>
                {/* O span da categoria foi removido da sua versão original, 
                  mas vou mantê-lo caso você queira usá-lo 
                */}
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