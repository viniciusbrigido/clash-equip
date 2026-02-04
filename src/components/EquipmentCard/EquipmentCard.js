import React from 'react';
import {getEquipmentData, isEpicEquipment, isMaxLevel} from '../../utils/equipmentImages';
import './EquipmentCard.css';

const EquipmentCard = ({ equipment, playerLevel = null, isEquipped = false }) => {
  const equipmentData = getEquipmentData(equipment.name);
  const level = playerLevel || equipment.level;
  const hasLevel = level !== null && level !== undefined;
  const isMax = hasLevel ? isMaxLevel(equipment.name, level) : false;
  const isEpic = isEpicEquipment(equipment.name);
  const isUnlocked = hasLevel;

  const getRarityColor = (level, isMax) => {
    if (isMax) return { bg: '#ffd700', shadow: 'rgba(255, 215, 0, 0.5)' };
    if (isEpic) return { bg: '#9c27b0', shadow: 'rgba(156, 39, 176, 0.4)' };
    return { bg: '#4caf50', shadow: 'rgba(76, 175, 80, 0.4)' };
  };

  return (
    <div className={`equipment-card ${!isUnlocked ? 'locked' : ''}`}>
      <div className="equipment-image">
        <img 
          src={equipmentData.image}
          alt={equipment.name}
          className="equipment-icon-img"
          onError={(e) => {
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
