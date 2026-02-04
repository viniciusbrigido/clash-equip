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
  const [selectedHeroes, setSelectedHeroes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isPlayerInfoExpanded, setIsPlayerInfoExpanded] = useState(true);
  
  // Filter states with localStorage persistence
  const [showOnlyEquipped, setShowOnlyEquipped] = useState(() => {
    const saved = localStorage.getItem('showOnlyEquipped');
    return saved ? JSON.parse(saved) : false;
  });
  
  const [hideUnlocked, setHideUnlocked] = useState(() => {
    const saved = localStorage.getItem('hideUnlocked');
    return saved ? JSON.parse(saved) : false;
  });

  const processPlayerEquipment = (data) => {
    const playerEquip = [];
    const playerEquipEquipped = [];

    data.heroes.forEach(hero => {
      if (hero.equipment) {
        hero.equipment.forEach(eq => {
          playerEquipEquipped.push(eq);
        });
      }
    });

    data.heroEquipment.forEach(eq => {
      const equipment = {
        ...eq,
        equipped: playerEquipEquipped.some(equipEquipped => equipEquipped.name === eq.name)
      };
      playerEquip.push(equipment);
    });

    return playerEquip;
  };

  const handlePlayerSearch = async (playerId) => {
    setLoading(true);
    setError('');
    setPlayerData(null);
    setPlayerEquipment([]);
    setSelectedHeroes([]);
    setIsPlayerInfoExpanded(false); // Collapse when new player is loaded

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

  const handleNewSearch = () => {
    setPlayerData(null);
    setPlayerEquipment([]);
    setSelectedHeroes([]);
    setError('');
    setIsPlayerInfoExpanded(true);
  };

  const handleHeroFilter = (heroNames) => {
    setSelectedHeroes(heroNames);
  };

  const togglePlayerInfo = () => {
    setIsPlayerInfoExpanded(!isPlayerInfoExpanded);
  };

  const handleShowOnlyEquippedChange = (checked) => {
    setShowOnlyEquipped(checked);
    localStorage.setItem('showOnlyEquipped', JSON.stringify(checked));
  };

  const handleHideUnlockedChange = (checked) => {
    setHideUnlocked(checked);
    localStorage.setItem('hideUnlocked', JSON.stringify(checked));
  };

  return (
    <div className="hero-equipment-page">
      <div className="page-header">
        <h1>⚔️ Equipamentos dos Heróis</h1>
      </div>

      {!playerData && (
        <PlayerSearch onSearch={handlePlayerSearch} loading={loading} />
      )}
      
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
          <div className="player-header-collapsed">
            <div className="player-basic-info">
              <h2>👤 {playerData.name}</h2>
              <button className="expand-btn" onClick={togglePlayerInfo}>
                {isPlayerInfoExpanded ? '▼' : '▶'}
              </button>
            </div>
            <button className="new-search-btn" onClick={handleNewSearch}>
              🔍 Buscar outro jogador
            </button>
          </div>
          
          {isPlayerInfoExpanded && (
            <div className="player-details-expanded">
              <div className="player-details">
                <span className="player-tag">🏷️ {playerData.tag}</span>
                {playerData.leagueTier && (
                  <div className="player-league">
                    <img 
                      src={playerData.leagueTier.iconUrls.small} 
                      alt={playerData.leagueTier.name}
                      className="league-icon"
                    />
                    <span className="league-name">{playerData.leagueTier.name}</span>
                  </div>
                )}
                <span className="player-trophies">🏆 {playerData.trophies}</span>
              </div>
              {playerData.labels && playerData.labels.length > 0 && (
                <div className="player-labels">
                  {playerData.labels.map((label) => (
                    <div key={label.id} className="player-label">
                      <img 
                        src={label.iconUrls.small} 
                        alt={label.name}
                        className="label-icon"
                      />
                      <span className="label-name">{label.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {playerEquipment.length > 0 && (
        <HeroFilter
          selectedHeroes={selectedHeroes}
          onHeroSelect={handleHeroFilter}
          showOnlyEquipped={showOnlyEquipped}
          onShowOnlyEquippedChange={handleShowOnlyEquippedChange}
          hideUnlocked={hideUnlocked}
          onHideUnlockedChange={handleHideUnlockedChange}
        />
      )}

      {playerEquipment.length > 0 && (
        <EquipmentGrid 
          playerEquipment={playerEquipment}
          selectedHeroes={selectedHeroes}
          showOnlyEquipped={showOnlyEquipped}
          hideUnlocked={hideUnlocked}
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
