import React from 'react';
import './HeroFilter.css';

const HEROES = [
  { name: 'Barbarian King', icon: '👑', key: 'Barbarian King' },
  { name: 'Archer Queen', icon: '🏹', key: 'Archer Queen' },
  { name: 'Grand Warden', icon: '🧙‍♂️', key: 'Grand Warden' },
  { name: 'Royal Champion', icon: '⚔️', key: 'Royal Champion' },
  { name: 'Minion Prince', icon: '🦇', key: 'Minion Prince' }
];

const HeroFilter = ({ selectedHeroes, onHeroSelect }) => {
  const isAllSelected = selectedHeroes.length === 0;
  
  const handleHeroToggle = (heroKey) => {
    if (selectedHeroes.includes(heroKey)) {
      // Remove hero from selection
      onHeroSelect(selectedHeroes.filter(h => h !== heroKey));
    } else {
      // Add hero to selection
      onHeroSelect([...selectedHeroes, heroKey]);
    }
  };

  const handleSelectAll = () => {
    onHeroSelect([]);
  };

  return (
    <div className="hero-filter">
      <h3>🦸‍♂️ Filtrar por Herói</h3>
      <div className="hero-buttons">
        <button
          className={isAllSelected ? 'hero-btn active' : 'hero-btn'}
          onClick={handleSelectAll}
        >
          <span className="hero-icon">🌟</span>
          <span className="hero-name">Todos</span>
        </button>
        
        {HEROES.map((hero) => (
          <button
            key={hero.key}
            className={selectedHeroes.includes(hero.key) ? 'hero-btn active' : 'hero-btn'}
            onClick={() => handleHeroToggle(hero.key)}
          >
            <span className="hero-icon">{hero.icon}</span>
            <span className="hero-name">{hero.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default HeroFilter;
