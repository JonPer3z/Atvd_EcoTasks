import TaskItem from './TaskItem';

function TaskList({ tarefas = [], onDeleteTask, onToggleStatus }) {

    if (tarefas.length === 0) {
        return (
            <div className="task-list-empty" style={{ textAlign: 'center', padding: '2rem', color: '#64748B' }}>
                <p style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>🥳 Nenhuma tarefa sustentável a ser exibida.</p>
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
                    onToggleStatus={onToggleStatus} 
                />
            ))}
        </div>
    );
}

export default TaskList;