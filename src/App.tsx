import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import Sidebar from './components/SideBar/SideBar';
import anime from 'animejs/lib/anime.es.js';

import NoteBlock from './components/NoteBlock/NoteBlock'; // Assurez-vous que NoteBlockProps est exporté depuis le fichier NoteBlock
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

  const useCreateNoteBlock = (
    noteBlocks: Note[],
    setNoteBlocks: Dispatch<SetStateAction<Note[]>>
  ) => {
    const createNoteBlock = (color: string) => {
      const newNoteBlock = {
        id: uuidv4(),
        color,
        content: '',
        date: formatNewDate(),
      };
      setNoteBlocks([newNoteBlock, ...noteBlocks]); // place newNoteBlock au début du tableau
    };
    return createNoteBlock;
  };
  const initialNoteBlocks =
    JSON.parse(localStorage.getItem('noteBlocks')!) || [];
  const [noteBlocks, setNoteBlocks] = useState<Note[]>(initialNoteBlocks);
  const createNoteBlock = useCreateNoteBlock(noteBlocks, setNoteBlocks);

  useEffect(() => {
    localStorage.setItem('noteBlocks', JSON.stringify(noteBlocks));
  }, [noteBlocks]);

  const [deletingNotes, setDeletingNotes] = useState<string[]>([]);
  const handleDeleteNote = (idToDelete: string) => {
    setDeletingNotes([...deletingNotes, idToDelete]);
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    anime({
      targets: `#note-block-${idToDelete}`,
      opacity: [1, 0],
      scale: [1, 0],
      duration: 500,
      easing: 'easeInOutExpo',
    }).finished.then(() => {
      setNoteBlocks(
        noteBlocks.filter((noteBlock) => noteBlock.id !== idToDelete)
      );
      setDeletingNotes(deletingNotes.filter((id) => id !== idToDelete));
    });
  };

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
            isDeleting={deletingNotes.includes(noteBlock.id)} //
          />
        ))}
      </div>
    </div>
  );
};

export default App;
