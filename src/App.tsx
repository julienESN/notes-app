import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/SideBar/SideBar';
import anime from 'animejs/lib/anime.es.js';
import NoteBlock from './components/NoteBlock/NoteBlock';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

interface Note {
  id: string;
  color: string;
  content: string;
  date: string;
}

const App: React.FC = () => {
  const formatNewDate = (): string => {
    return new Date().toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const initialNoteBlocks = JSON.parse(
    localStorage.getItem('noteBlocks') || '[]'
  );
  const [noteBlocks, setNoteBlocks] = useState<Note[]>(initialNoteBlocks);
  const [deletingNotes, setDeletingNotes] = useState<string[]>([]);

  // Hook personnalisé pour créer un bloc-notes
  const createNoteBlock = useCallback(
    (color: string) => {
      const newNoteBlock = {
        id: uuidv4(),
        color,
        content: '',
        date: formatNewDate(),
      };
      setNoteBlocks([newNoteBlock, ...noteBlocks]);
    },
    [noteBlocks]
  );

  // Effet pour stocker les blocs-notes dans le localStorage
  useEffect(() => {
    localStorage.setItem('noteBlocks', JSON.stringify(noteBlocks));
  }, [noteBlocks]);

  // Gestionnaire de suppression de note
  const handleDeleteNote = (idToDelete: string) => {
    setDeletingNotes([...deletingNotes, idToDelete]);
    void anime({
      targets: `#note-block-${idToDelete}`,
      opacity: [1, 0],
      scale: [1, 0],
      duration: 500,
      easing: 'easeInOutExpo',
    })
      .finished.then(() => {
        setNoteBlocks(
          noteBlocks.filter((noteBlock) => noteBlock.id !== idToDelete)
        );
        setDeletingNotes(deletingNotes.filter((id) => id !== idToDelete));
      })
      .catch((error) => {
        console.error('An error occurred during animation: ', error);
      });
  };

  // Gestionnaire de modification de note
  const handleEdit = (id: string, newContent: string) => {
    setNoteBlocks(
      noteBlocks.map((noteBlock) =>
        noteBlock.id === id ? { ...noteBlock, content: newContent } : noteBlock
      )
    );
  };

  return (
    <div className="App">
      <header>
        <input type="text" placeholder="🔍 Search" className="search-bar" />
        <h1>Notes</h1>
      </header>
      <Sidebar createNoteBlock={createNoteBlock} />
      <div className="note-blocks">
        {noteBlocks.map((noteBlock) => (
          <NoteBlock
            key={noteBlock.id}
            id={noteBlock.id}
            color={noteBlock.color}
            date={noteBlock.date}
            content={noteBlock.content}
            onEdit={handleEdit}
            onDelete={handleDeleteNote}
            isDeleting={deletingNotes.includes(noteBlock.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
