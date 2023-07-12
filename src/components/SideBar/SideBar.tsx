import React from 'react';
import './Sidebar.css';
import anime from 'animejs/lib/anime.es.js';

const Sidebar: React.FC = () => {
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
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
      // assigne une couleur unique à chaque dot
      dot.style.backgroundColor = shuffledColors[i];

      // rendre le point visible
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
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
            <div className="dot" key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
