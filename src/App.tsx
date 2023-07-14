import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import NoteBlock from './components/NoteBlock/NoteBlock';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

const App: React.FC = () => {
  const formatNewDate = () => {
    return new Date().toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const useCreateNoteBlock = (noteBlocks, setNoteBlocks) => {
    const createNoteBlock = (color) => {
      const newNoteBlock = {
        id: uuidv4(),
        color,
        content: '',
        date: formatNewDate(),
      };
      setNoteBlocks([...noteBlocks, newNoteBlock]);
    };
    return createNoteBlock;
  };
  const initialNoteBlocks =
    JSON.parse(localStorage.getItem('noteBlocks')) || [];
  const [noteBlocks, setNoteBlocks] = useState(initialNoteBlocks);
  const createNoteBlock = useCreateNoteBlock(noteBlocks, setNoteBlocks);
  const [marginLeft, setMarginLeft] = useState(0);

  useEffect(() => {
    localStorage.setItem('noteBlocks', JSON.stringify(noteBlocks));
  }, [noteBlocks]);

  const handleEdit = (id, newContent) => {
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
            marginLeft={marginLeft}
            date={noteBlock.date}
            content={noteBlock.content} // Nouveau
            onEdit={handleEdit} // Nouveau
          />
        ))}
      </div>
    </div>
  );
};

export default App;
