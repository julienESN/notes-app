/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useRef, useEffect } from 'react';
import './SideBar.css';
import anime from 'animejs/lib/anime.es.js';

interface SidebarProps {
  createNoteBlock: (color: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ createNoteBlock }) => {
  const colors = [
    '#d6e6ff',
    '#d7f9f8',
    '#ffffea',
    '#fff0d4',
    '#fbe0e0',
    '#e5d4ef',
    '#f1ddbf',
    '#525e75',
    '#78938',
    '#92ba92',
    '#ffadad',
    '#ffd6a5',
    '#ffd6a5',
    '#caffbf',
    '#9bf6ff',
    '#a0c4ff',
    '#bdb2ff',
    '#ffc6ff',
  ]; // les couleurs de vos dots
  
  // Utilisation de useRef pour accéder à chaque dot dans le DOM
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  // Gestionnaire de clic pour les dots, utilisé pour créer une note avec la couleur du dot cliqué
  const handleDotClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const color = (event.target as HTMLDivElement).style.backgroundColor;
    createNoteBlock(color);
  };
  // Gestionnaire de clic pour le bouton d'ajout, utilisé pour animer le bouton et les dots
  const handleClick = () => {
    // animation du bouton +
    anime({
      targets: '.add-note-button',
      translateY: [-20, 0], // le saut est un peu plus haut
      rotate: '+=1turn',
      duration: 750, // réduire pour une animation plus rapide
      easing: 'easeOutBounce',
    });

    // Mélangez les couleurs avant de les assigner aux dots
    const shuffledColors = [...colors].sort(() => Math.random() - 0.5);

    // animation des points
    dotRefs.current.forEach((dot, i) => {
      if (!dot) return;

      // assigne une couleur unique à chaque dot
      dot.style.backgroundColor = shuffledColors[i];

      // rendre le point visible
      dot.style.visibility = 'visible';

      // animation du point
      anime({
        targets: dot,
        scale: [0, 1], // commence à partir de 0 et se dilate jusqu'à sa taille normale
        opacity: [0, 1], // commence à partir de 0 et atteint pleine opacité
        translateY: ['0%', `${150 + i * 175}%`], // déplace le point du centre du bouton vers le bas et ajoute un espace supplémentaire pour chaque point
        duration: 500, // réduire pour une animation plus rapide
        delay: 250 + i * 1000, // commence l'animation 500 ms après le début de l'animation du bouton + et ajoute un délai supplémentaire pour chaque point
        easing: 'easeOutElastic(1, .8)', // donne un effet élastique
      });
    });
  };

  useEffect(() => {
    dotRefs.current = dotRefs.current.slice(0, 5);
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Notes</h2>
        <div className="button-container">
          {/* le nouveau conteneur */}
          <button className="add-note-button" onClick={handleClick}>
            +
          </button>
          {/* Créez 5 dots */}
          {[...Array(5)].map((_, i) => (
            <div
              ref={(el) => (dotRefs.current[i] = el)}
              className="dot"
              onClick={handleDotClick}
              key={i}
              style={{ backgroundColor: colors[i], cursor: 'pointer' }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
