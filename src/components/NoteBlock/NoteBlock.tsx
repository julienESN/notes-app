import React, { useEffect } from 'react';
import anime from 'animejs/lib/anime.es.js';
import './NoteBlock.css';

const NoteBlock = ({ id, color, date }) => {
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
      {/* Ajout de la date et du bouton d'édition */}
      <div className="note-block-footer">
        <div className="note-block-date">{date}</div>
        <button className="note-block-edit-button">✎</button>
      </div>
    </div>
  );
};

export default NoteBlock;
