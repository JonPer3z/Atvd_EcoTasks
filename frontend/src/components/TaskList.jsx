// /frontend/src/components/TaskList.jsx

import TaskItem from './TaskItem';

// Define um array vazio como valor padrão para 'tarefas'
function TaskList({ tarefas = [], onDeleteTask }) { 
    
    // Agora o .length é acessado com segurança
    if (tarefas.length === 0) {
        return (
            <div className="task-list-empty">
                <p>🥳 Nenhuma tarefa sustentável a ser exibida.</p>
                <p>Use os filtros ou adicione uma nova ação sustentável!</p>
            </div>
        );
    }
    
    // Ordenação
    const tarefasOrdenadas = [...tarefas].sort((a, b) => a.status - b.status);

    return (
        <div className="task-list">
            {tarefasOrdenadas.map((tarefa) => (
                <TaskItem
                    key={tarefa.id}
                    tarefa={tarefa}
                    onDeleteTask={onDeleteTask}
                />
            ))}
        </div>
    );
}

export default TaskList;