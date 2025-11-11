// /frontend/src/components/TaskList.jsx

import TaskItem from './TaskItem';

// Adicionado onToggleStatus
function TaskList({ tarefas = [], onDeleteTask, onToggleStatus }) { 
    
    if (tarefas.length === 0) {
        return (
            <div className="task-list-empty">
                <p>🥳 Nenhuma tarefa sustentável a ser exibida.</p>
                <p>Use os filtros ou adicione uma nova ação sustentável!</p>
            </div>
        );
    }
    
    const tarefasOrdenadas = [...tarefas].sort((a, b) => a.status - b.status);

    return (
        <div className="task-list">
            {tarefasOrdenadas.map((tarefa) => (
                <TaskItem
                    key={tarefa.id}
                    tarefa={tarefa}
                    onDeleteTask={onDeleteTask}
                    onToggleStatus={onToggleStatus} // Passa o prop adiante
                />
            ))}
        </div>
    );
}

export default TaskList;