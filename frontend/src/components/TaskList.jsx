// /frontend/src/components/TaskList.jsx

import TaskItem from './TaskItem';

// Removido onToggleStatus dos argumentos
function TaskList({ tarefas, onDeleteTask }) { 
    
    if (tarefas.length === 0) {
        // ...
    }
    
    // A ordenação por status ainda é útil se o GET retornar status
    const tarefasOrdenadas = [...tarefas].sort((a, b) => a.status - b.status); 

    return (
        <div className="task-list">
            {tarefasOrdenadas.map((tarefa) => (
                <TaskItem
                    key={tarefa.id}
                    tarefa={tarefa}
                    onDeleteTask={onDeleteTask}
                    // Prop onToggleStatus Removida
                />
            ))}
        </div>
    );
}

export default TaskList;