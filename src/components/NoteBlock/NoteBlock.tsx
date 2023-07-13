import React, { useEffect } from 'react';
import anime from 'animejs/lib/anime.es.js';
import './NoteBlock.css';

const NoteBlock = ({ id, color }) => {
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
      {/* Contenu de votre note ici */}
    </div>
  );
};

export default NoteBlock;
