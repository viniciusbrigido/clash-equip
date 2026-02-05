import React from 'react';
import './HeroFilter.css';

const HEROES = [
  { name: 'Barbarian King', key: 'Barbarian King', image: '/heroes/barbarian-king.png' },
  { name: 'Archer Queen', key: 'Archer Queen', image: '/heroes/archer-queen.png' },
  { name: 'Grand Warden', key: 'Grand Warden', image: '/heroes/grand-warden.png' },
  { name: 'Royal Champion', key: 'Royal Champion', image: '/heroes/royal-champion.png' },
  { name: 'Minion Prince', key: 'Minion Prince', image: '/heroes/minion-prince.png' },
];

const HeroFilter = ({ selectedHeroes, onHeroSelect, showOnlyEquipped, onShowOnlyEquippedChange, hideUnlocked, onHideUnlockedChange }) => {
  const handleHeroToggle = (heroKey) => {
    if (selectedHeroes.includes(heroKey)) {
      // Remove hero from selection
      onHeroSelect(selectedHeroes.filter(h => h !== heroKey));
    } else {
      // Add hero to selection
      onHeroSelect([...selectedHeroes, heroKey]);
    }
  };

  return (
    <div className="hero-filter">
      <h3>🦸‍♂️ Filtrar por Herói</h3>
      <div className="hero-buttons">
        {HEROES.map((hero) => (
          <button
            key={hero.key}
            className={selectedHeroes.includes(hero.key) ? 'hero-btn active' : 'hero-btn'}
            onClick={() => handleHeroToggle(hero.key)}
          >
            <img
              src={hero.image}
              alt={hero.name}
              className="hero-img"
            />

            <span className="hero-name">{hero.name}</span>
          </button>
        ))}
      </div>
      
      <div className="filter-checkboxes">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={showOnlyEquipped}
            onChange={(e) => onShowOnlyEquippedChange(e.target.checked)}
          />
          <span className="checkbox-text">Mostrar apenas equipados</span>
        </label>
        
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={hideUnlocked}
            onChange={(e) => onHideUnlockedChange(e.target.checked)}
          />
          <span className="checkbox-text">Ocultar não desbloqueados</span>
        </label>
      </div>
    </div>
  );
};

export default HeroFilter;
