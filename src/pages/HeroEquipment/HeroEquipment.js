import React, { useState } from 'react';
import { useApi } from '../../contexts/ApiContext';
import PlayerSearch from '../../components/PlayerSearch/PlayerSearch';
import HeroFilter from '../../components/HeroFilter/HeroFilter';
import EquipmentGrid from '../../components/EquipmentGrid/EquipmentGrid';
import './HeroEquipment.css';

const HeroEquipment = () => {
  const { fetchPlayerData } = useApi();
  const [playerData, setPlayerData] = useState(null);
  const [playerEquipment, setPlayerEquipment] = useState([]);
  const [selectedHero, setSelectedHero] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const processPlayerEquipment = (data) => {
    const playerEquip = [];


    data.heroEquipment.forEach(eq => {
      playerEquip.push(eq);
    });

    return playerEquip;
  };

  const handlePlayerSearch = async (playerId) => {
    setLoading(true);
    setError('');
    setPlayerData(null);
    setPlayerEquipment([]);
    setSelectedHero(null);

    try {
      const data = await fetchPlayerData(playerId);
      setPlayerData(data);

      if (data.heroes && data.heroes.length > 0) {
        const playerEquip = processPlayerEquipment(data);
        setPlayerEquipment(playerEquip);
      } else {
        setPlayerEquipment([]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleHeroFilter = (heroName) => {
    setSelectedHero(heroName);
  };

  return (
    <div className="hero-equipment-page">
      <div className="page-header">
        <h1>⚔️ Equipamentos dos Heróis</h1>
        <p>Visualize os equipamentos dos heróis de qualquer jogador do Clash of Clans</p>
      </div>

      <PlayerSearch onSearch={handlePlayerSearch} loading={loading} />
      
      {error && (
        <div className="error-message">
          <div className="error-icon">❌</div>
          <div className="error-content">
            <h4>Erro ao buscar dados</h4>
            <p>{error}</p>
          </div>
        </div>
      )}

      {playerData && (
        <div className="player-info">
          <div className="player-header">
            <h2>👤 {playerData.name}</h2>
            <div className="player-details">
              <span className="player-tag">🏷️ {playerData.tag}</span>
              <span className="player-level">⭐ Nível {playerData.expLevel}</span>
              <span className="player-trophies">🏆 {playerData.trophies}</span>
            </div>
          </div>
        </div>
      )}

      {playerEquipment.length > 0 && (
        <HeroFilter
          selectedHero={selectedHero}
          onHeroSelect={handleHeroFilter}
        />
      )}

      {playerEquipment.length > 0 && (
        <EquipmentGrid 
          playerEquipment={playerEquipment}
          selectedHero={selectedHero}
        />
      )}

      {loading && (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Carregando dados do jogador...</p>
        </div>
      )}
    </div>
  );
};

export default HeroEquipment;
