import React from 'react';

const FILTER_OPTIONS = [
  { value: 'all', label: 'Todas' },
  { value: 'pending', label: '🔴 Pendentes' },
  { value: 'completed', label: '🟢 Concluídas' },
  { value: 'reciclagem', label: '♻️ Reciclagem' },
  { value: 'economia', label: '💧 Economia' },
  { value: 'meio ambiente', label: '🌳 Meio Ambiente' },
];

function FilterBar({ currentFilter, onFilterChange }) {

  const handleFilterClick = (filterValue) => {
    onFilterChange(filterValue);
  };

  return (
    <div className="filter-bar">
      <label className="filter-label">Filtrar por:</label>
      <div className="filter-buttons">
        {FILTER_OPTIONS.map((option) => (
          <button
            key={option.value}
            className={`filter-btn ${currentFilter === option.value ? 'active' : ''}`}
            onClick={() => handleFilterClick(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FilterBar;