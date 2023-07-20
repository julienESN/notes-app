import React, { useEffect, useState, useRef } from 'react'; // Ajoutez useRef
import anime from 'animejs/lib/anime.es.js';
import './NoteBlock.css';

const NoteBlock = ({ id, color, date, content, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const contentRef = useRef(null); // Nouveau

  const handleDeleteButtonClick = () => {
    setIsDeleting(true);
  };

  const handleEditButtonClick = () => {
    setIsEditing(true);
  };

  const handleBlur = (event) => {
    onEdit(id, event.target.textContent);
    setIsEditing(false); // Ajouté pour arrêter l'édition lorsqu'on clique en dehors
  };

  useEffect(() => {
    if (isEditing && contentRef.current) {
      contentRef.current.focus(); // Auto-focus lorsque isEditing est true
    }
  }, [isEditing]);

  useEffect(() => {
    anime({
      targets: `#note-block-${id}`,
      scale: [0, 1],
      duration: 3000,
      elasticity: 2000,
      easing: 'easeOutElastic',
    });
  }, [id]);

  // Nouveau
  useEffect(() => {
    if (isDeleting) {
      anime({
        targets: `#note-block-${id}`,
        opacity: [1, 0],
        scale: [1, 0],
        duration: 2000,
        easing: 'easeInOutExpo',
        complete: function (anim) {
          onDelete(id);
        },
      });
    }
  }, [isDeleting, id, onDelete]);

  return (
    <div
      id={`note-block-${id}`}
      className="note-block"
      style={{ backgroundColor: color }}
    >
      <p
        ref={contentRef} // Ajoutez la ref ici
        contentEditable={isEditing}
        onBlur={handleBlur}
        className={isEditing ? 'editable' : ''} // Quand on arrête d'éditer, met à jour le contenu de la note
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
        <button
          className="note-block-delete-button"
          onClick={handleDeleteButtonClick}
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default NoteBlock;
