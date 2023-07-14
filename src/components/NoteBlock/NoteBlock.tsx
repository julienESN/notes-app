import React, { useEffect } from 'react';
import { useState } from 'react';
import anime from 'animejs/lib/anime.es.js';
import './NoteBlock.css';

const NoteBlock = ({ id, color, date, content, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false); // Nouveau

  const handleEditButtonClick = () => {
    // Nouveau
    setIsEditing(!isEditing);
  };
  const handleBlur = (event) => {
    // Nouveau
    onEdit(id, event.target.textContent);
  };

  useEffect(() => {
    anime({
      targets: `#note-block-${id}`,
      scale: [0, 1],
      duration: 3000,
      elasticity: 2000,
      easing: 'easeOutElastic',
    });
  }, [id]);

  return (
    <div
      id={`note-block-${id}`}
      className="note-block"
      style={{ backgroundColor: color }}
    >
      <p
        contentEditable={isEditing} // L'attribut contentEditable est défini par le state isEditing
        onBlur={handleBlur} // Quand on arrête d'éditer, met à jour le contenu de la note
      >
        {content}
      </p>
      <div className="note-block-footer">
        <div className="note-block-date">{date}</div>
        <button
          className="note-block-edit-button"
          onClick={handleEditButtonClick}
        >
          ✎
        </button>
      </div>
    </div>
  );
};

export default NoteBlock;
