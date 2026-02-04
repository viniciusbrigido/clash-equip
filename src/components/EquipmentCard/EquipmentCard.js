import React from 'react';
import { getEquipmentData, isMaxLevel } from '../../utils/equipmentImages';
import './EquipmentCard.css';

const EquipmentCard = ({ equipment, playerLevel = null, isEquipped = false }) => {
  const equipmentData = getEquipmentData(equipment.name);
  const level = playerLevel || equipment.level;
  const hasLevel = level !== null && level !== undefined;
  const isMax = hasLevel ? isMaxLevel(equipment.name, level) : false;
  const isUnlocked = hasLevel;

  const getRarityColor = (level, isMax) => {
    if (isMax) return { bg: '#ffd700', shadow: 'rgba(255, 215, 0, 0.5)' }; // Dourado para nível máximo
    if (level >= 18) return { bg: '#9c27b0', shadow: 'rgba(156, 39, 176, 0.4)' }; // Epic  
    if (level >= 9) return { bg: '#2196f3', shadow: 'rgba(33, 150, 243, 0.4)' };  // Rare
    return { bg: '#4caf50', shadow: 'rgba(76, 175, 80, 0.4)' }; // Common
  };

  return (
    <div className={`equipment-card ${!isUnlocked ? 'locked' : ''}`}>
      <div className="equipment-image">
        <img 
          src={equipmentData.image}
          alt={equipment.name}
          className="equipment-icon-img"
          onError={(e) => {
            // Fallback para a imagem da API se a local não existir
            e.target.src = equipment.iconUrls?.medium || equipment.iconUrls?.small || '/equipment-icons/default-equipment.png';
          }}
        />
        {isEquipped && isUnlocked && (
          <div className="equipped-badge">
            E
          </div>
        )}
        {isUnlocked && (
          <div 
            className={`level-badge ${isMax ? 'max-level' : ''}`}
            style={{ 
              background: `linear-gradient(135deg, ${getRarityColor(level, isMax).bg} 0%, ${getRarityColor(level, isMax).bg}dd 100%)`,
              boxShadow: `0 2px 8px ${getRarityColor(level, isMax).shadow}`
            }}
          >
            {level}
          </div>
        )}
      </div>
      <div className="equipment-info">
        <h4 className="equipment-name">{equipment.name}</h4>
      </div>
    </div>
  );
};

export default EquipmentCard;
