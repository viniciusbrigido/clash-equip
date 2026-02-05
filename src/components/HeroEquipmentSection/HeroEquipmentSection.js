import React from 'react';
import EquipmentCard from '../EquipmentCard/EquipmentCard';
import './HeroEquipmentSection.css';

const HeroEquipmentSection = ({ heroName, allEquipment, playerEquipmentMap, heroIcon, showOnlyEquipped = false, hideUnlocked = false }) => {
  // Filter equipment based on the filter options
  const filteredEquipment = allEquipment.filter((equipmentData) => {
    const playerEquipment = playerEquipmentMap[equipmentData.name];
    const isEquipped = playerEquipment?.equipped;
    const isUnlocked = playerEquipment?.level !== null && playerEquipment?.level !== undefined;
    
    // If showOnlyEquipped is true, only show equipped items
    if (showOnlyEquipped && !isEquipped) {
      return false;
    }
    
    // If hideUnlocked is true, hide items that are not unlocked
    if (hideUnlocked && !isUnlocked) {
      return false;
    }
    
    return true;
  });

  // Don't render the section if no equipment passes the filters
  if (filteredEquipment.length === 0) {
    return null;
  }

  return (
    <div className="hero-equipment-section">
      <div className="hero-section-header">
        <div className="hero-info">
          <span className="hero-icon">{heroIcon}</span>
          <h3 className="hero-name">{heroName}</h3>
        </div>
      </div>
      
      <div className="hero-equipment-grid">
        {filteredEquipment.map((equipmentData, index) => {
          const playerEquipment = playerEquipmentMap[equipmentData.name];
          const displayEquipment = playerEquipment || {
            name: equipmentData.name,
            heroName: heroName
          };
          
          return (
            <EquipmentCard 
              key={`${equipmentData.name}-${index}`} 
              equipment={displayEquipment}
              playerLevel={playerEquipment?.level}
              isEquipped={playerEquipment?.equipped}
            />
          );
        })}
      </div>
    </div>
  );
};

export default HeroEquipmentSection;
