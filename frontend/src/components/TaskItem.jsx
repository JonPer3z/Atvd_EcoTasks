function TaskItem({ tarefa, onDeleteTask, onToggleStatus }) {

    const { id, title, category, status } = tarefa;

    return (
        <div className={`task-item ${status ? 'completed' : ''}`}>

            <input
                type="checkbox"
                className="task-checkbox" 
                checked={status}
                onChange={() => onToggleStatus(id, !status)}
                style={{ marginRight: '1rem', cursor: 'pointer' }}
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