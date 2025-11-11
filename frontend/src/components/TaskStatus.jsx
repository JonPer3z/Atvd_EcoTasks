import React, { useMemo } from 'react';

function TaskStatus({ tarefas }) {
  
  const { total, concluidas, pendentes, percentual } = useMemo(() => {
    const total = tarefas.length;
    const concluidas = tarefas.filter(t => t.status).length;
    const pendentes = total - concluidas;
    
    const percentual = total === 0 ? 0 : Math.round((concluidas / total) * 100);
    
    return { total, concluidas, pendentes, percentual };
  }, [tarefas]);

  return (
    <div className="status-card">
      <h3 className="status-title">📈 Seu Progresso Sustentável</h3>
      
      <div className="progress-bar-container">
        <div 
          className="progress-bar-fill" 
          style={{ width: `${percentual}%` }}
        >
          {percentual}%
        </div>
      </div>
      <p className="progress-text">
        {concluidas} de {total} tarefas concluídas!
      </p>

      <div className="status-grid">
        <div className="status-metric total">
          <span className="metric-value">{total}</span>
          <span className="metric-label">Total de Ações</span>
        </div>
        <div className="status-metric completed">
          <span className="metric-value">{concluidas}</span>
          <span className="metric-label">Concluídas</span>
        </div>
        <div className="status-metric pending">
          <span className="metric-value">{pendentes}</span>
          <span className="metric-label">Pendentes</span>
        </div>
      </div>
    </div>
  );
}

export default TaskStatus;