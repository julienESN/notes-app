import { useEffect, useState, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';
import './NoteBlock.css';

interface NoteBlockProps {
  id: string;
  color: string;
  date: string;
  content: string;
  onEdit: (id: string, content: string) => void;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}

const NoteBlock: React.FC<NoteBlockProps> = ({
  id,
  color,
  date,
  content,
  onEdit,
  onDelete,
  isDeleting,
}) => {
  // État local pour suivre si la note est en cours d'édition
  const [isEditing, setIsEditing] = useState(false);

  // Référence pour accéder au contenu de la note dans le DOM
  const contentRef = useRef<HTMLParagraphElement>(null);

  // Fonction générique pour gérer les animations
  const animate = (animationProps: anime.AnimeParams) => {
    anime(animationProps);
  };

  useEffect(() => {
    // Animation d'ouverture lors de l'initialisation de la note
    animate({
      targets: `#note-block-${id}`,
      scale: [0, 1],
      duration: 500,
      elasticity: 2000,
      easing: 'easeOutElastic',
    });

    // Animation de suppression si isDeleting est défini
    if (isDeleting) {
      animate({
        targets: `#note-block-${id}`,
        opacity: [1, 0],
        scale: [1, 0],
        duration: 500,
        easing: 'easeInOutExpo',
      });
    }
  }, [id, isDeleting]);

  useEffect(() => {
    // Auto-focus sur le contenu lors de l'édition
    if (isEditing && contentRef.current) {
      contentRef.current.focus();
    }
  }, [isEditing]);

  return (
    <div
      id={`note-block-${id}`}
      className="note-block"
      style={{ backgroundColor: color }}
    >
      <p
        ref={contentRef}
        contentEditable={isEditing}
        onBlur={(event) => {
          onEdit(id, event.target.textContent || '');
          setIsEditing(false);
        }}
        className={isEditing ? 'editable' : ''}
      >
        {content}
      </p>
      <div className="note-block-footer">
        <div className="note-block-date">{date}</div>
        <button
          className="note-block-edit-button"
          onClick={() => setIsEditing(true)}
        >
          ✎
        </button>
        <button
          className="note-block-delete-button"
          onClick={() => onDelete(id)}
          disabled={isDeleting}
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default NoteBlock;
