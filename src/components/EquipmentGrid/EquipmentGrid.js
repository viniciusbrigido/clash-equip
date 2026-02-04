import React from 'react';
import HeroEquipmentSection from '../HeroEquipmentSection/HeroEquipmentSection';
import { getEquipmentsByHero } from '../../utils/equipmentImages';
import './EquipmentGrid.css';

const HERO_ICONS = {
  'Barbarian King': '👑',
  'Archer Queen': '🏹',
  'Grand Warden': '🧙‍♂️',
  'Royal Champion': '⚔️',
  'Minion Prince': '🦇'
};

const HEROES = ['Barbarian King', 'Archer Queen', 'Grand Warden', 'Royal Champion', 'Minion Prince'];

const EquipmentGrid = ({ playerEquipment, selectedHeroes, showOnlyEquipped = false, hideUnlocked = false }) => {
  // Criar mapa dos equipamentos do jogador para fácil acesso
  const playerEquipmentMap = {};
  if (playerEquipment) {
    playerEquipment.forEach(eq => {
      playerEquipmentMap[eq.name] = eq;
    });
  }

  // Filtrar heróis se específicos foram selecionados
  const heroesToShow = selectedHeroes.length > 0 ? selectedHeroes : HEROES;

  return (
    <div className="equipment-grid-container">
      <div className="equipment-header">
        <h3>
          ⚔️ Equipamentos {selectedHeroes.length > 0 ? `- ${selectedHeroes.join(', ')}` : ''}
        </h3>
      </div>
      
      <div className="heroes-vertical-layout">
        {heroesToShow.map((heroName) => {
          const allHeroEquipment = getEquipmentsByHero(heroName);

          if (allHeroEquipment.length === 0) return null;
          
          return (
            <HeroEquipmentSection
              key={heroName}
              heroName={heroName}
              allEquipment={allHeroEquipment}
              playerEquipmentMap={playerEquipmentMap}
              heroIcon={HERO_ICONS[heroName] || '⚔️'}
              showOnlyEquipped={showOnlyEquipped}
              hideUnlocked={hideUnlocked}
            />
          );
        })}
      </div>
    </div>
  );
};

export default EquipmentGrid;
