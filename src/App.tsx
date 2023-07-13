import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import NoteBlock from './components/NoteBlock/NoteBlock';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

const App: React.FC = () => {
  const initialNoteBlocks =
    JSON.parse(localStorage.getItem('noteBlocks')) || [];

  const [noteBlocks, setNoteBlocks] = useState(initialNoteBlocks);
  const [marginLeft, setMarginLeft] = useState(0);

  useEffect(() => {
    localStorage.setItem('noteBlocks', JSON.stringify(noteBlocks));
  }, [noteBlocks]);

  const createNoteBlock = (color) => {
    const newNoteBlock = {
      id: uuidv4(),
      color,
      date: new Date().toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
    };
    setNoteBlocks([...noteBlocks, newNoteBlock]);
    setMarginLeft((prevMarginLeft) => prevMarginLeft + 10);
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
          />
        ))}
      </div>
    </div>
  );
};

export default App;
