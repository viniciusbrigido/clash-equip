import React, { useState } from 'react';
import './PlayerSearch.css';

const PlayerSearch = ({ onSearch, loading }) => {
  const [playerId, setPlayerId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (playerId.trim()) {
      onSearch(playerId.trim());
    }
  };

  return (
    <div className="player-search">
      <h3>🔍 Buscar Jogador</h3>
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-group">
          <input
            type="text"
            value={playerId}
            onChange={(e) => setPlayerId(e.target.value)}
            placeholder="Digite o ID do jogador (ex: #Y292PGP0V)"
            className="player-input"
            disabled={loading}
            required
          />
          <button 
            type="submit" 
            className="search-btn"
            disabled={loading || !playerId.trim()}
          >
            {loading ? '🔄' : '🔍'} {loading ? 'Buscando...' : 'Buscar'}
          </button>
        </div>
      </form>
      <p className="search-hint">
        💡 O ID do jogador pode ser encontrado no perfil do jogo
      </p>
    </div>
  );
};

export default PlayerSearch;
