import React from 'react';
import './HeroFilter.css';

const HEROES = [
  { name: 'Barbarian King', icon: '👑', key: 'Barbarian King' },
  { name: 'Archer Queen', icon: '🏹', key: 'Archer Queen' },
  { name: 'Grand Warden', icon: '🧙‍♂️', key: 'Grand Warden' },
  { name: 'Royal Champion', icon: '⚔️', key: 'Royal Champion' },
  { name: 'Minion Prince', icon: '🦇', key: 'Minion Prince' }
];

const HeroFilter = ({ selectedHero, onHeroSelect }) => {
  return (
    <div className="hero-filter">
      <h3>🦸‍♂️ Filtrar por Herói</h3>
      <div className="hero-buttons">
        <button
          className={selectedHero === null ? 'hero-btn active' : 'hero-btn'}
          onClick={() => onHeroSelect(null)}
        >
          <span className="hero-icon">🌟</span>
          <span className="hero-name">Todos</span>
        </button>
        
        {HEROES.map((hero) => (
          <button
            key={hero.key}
            className={selectedHero === hero.key ? 'hero-btn active' : 'hero-btn'}
            onClick={() => onHeroSelect(hero.key)}
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
