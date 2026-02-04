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

const EquipmentGrid = ({ playerEquipment, selectedHero }) => {
  // Criar mapa dos equipamentos do jogador para fácil acesso
  const playerEquipmentMap = {};
  if (playerEquipment) {
    playerEquipment.forEach(eq => {
      playerEquipmentMap[eq.name] = eq;
    });
  }

  // Filtrar heróis se um específico foi selecionado
  const heroesToShow = selectedHero ? [selectedHero] : HEROES;

  return (
    <div className="equipment-grid-container">
      <div className="equipment-header">
        <h3>
          ⚔️ Equipamentos {selectedHero ? `- ${selectedHero}` : ''}
        </h3>
      </div>
      
      <div className="heroes-sections">
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
            />
          );
        })}
      </div>
    </div>
  );
};

export default EquipmentGrid;
