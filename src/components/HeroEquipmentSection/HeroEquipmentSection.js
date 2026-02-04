import React from 'react';
import EquipmentCard from '../EquipmentCard/EquipmentCard';
import './HeroEquipmentSection.css';

const HeroEquipmentSection = ({ heroName, allEquipment, playerEquipmentMap, heroIcon }) => {
  return (
    <div className="hero-equipment-section">
      <div className="hero-section-header">
        <div className="hero-info">
          <span className="hero-icon">{heroIcon}</span>
          <h3 className="hero-name">{heroName}</h3>
        </div>
      </div>
      
      <div className="hero-equipment-grid">
        {allEquipment.map((equipmentData, index) => {
          const playerEquipment = playerEquipmentMap[equipmentData.name];
          const displayEquipment = playerEquipment || {
            name: equipmentData.name,
            level: 1,
            heroName: heroName
          };
          
          return (
            <EquipmentCard 
              key={`${equipmentData.name}-${index}`} 
              equipment={displayEquipment}
              playerLevel={playerEquipment?.level}
            />
          );
        })}
      </div>
    </div>
  );
};

export default HeroEquipmentSection;
