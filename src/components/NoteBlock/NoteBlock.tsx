import { useEffect, useState, useRef } from 'react'; // Ajoutez useRef
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
  const [isEditing, setIsEditing] = useState(false);
  const contentRef = useRef<HTMLParagraphElement>(null);

  const handleDeleteButtonClick = () => {
    onDelete(id);
  };

  const handleEditButtonClick = () => {
    setIsEditing(true);
  };

  const handleBlur = (event: React.FocusEvent<HTMLParagraphElement>) => {
    onEdit(id, event.target.textContent || '');
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
      duration: 500,
      elasticity: 2000,
      easing: 'easeOutElastic',
    });
  }, [id]);

  useEffect(() => {
    if (isDeleting) {
      // Utilisez la prop ici
      anime({
        targets: `#note-block-${id}`,
        opacity: [1, 0],
        scale: [1, 0],
        duration: 500,
        easing: 'easeInOutExpo',
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
          disabled={isDeleting} // Utilisez isDeleting ici au lieu de props.isDeleting
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default NoteBlock;
