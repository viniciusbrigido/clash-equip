import React, { createContext, useContext } from 'react';

const ApiContext = createContext();

export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApi deve ser usado dentro de um ApiProvider');
  }
  return context;
};

export const ApiProvider = ({ children }) => {
  const fetchPlayerData = async (playerId) => {
    // Garantir que o playerId tenha o formato correto
    let formattedPlayerId = playerId.trim();
    if (!formattedPlayerId.startsWith('#')) {
      formattedPlayerId = '#' + formattedPlayerId;
    }

    // Remover o # para a URL
    const cleanPlayerId = formattedPlayerId.replace('#', '');
    
    try {
      const response = await fetch(`http://localhost:5000/api/player/${cleanPlayerId}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Erro: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Erro de conexão. Verifique se o backend está rodando.');
      }
      throw error;
    }
  };

  const value = {
    fetchPlayerData
  };

  return (
    <ApiContext.Provider value={value}>
      {children}
    </ApiContext.Provider>
  );
};
