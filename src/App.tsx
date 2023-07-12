import React, { useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import NoteBlock from './components/NoteBlock/NoteBlock';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

const App: React.FC = () => {
  const [noteBlocks, setNoteBlocks] = useState([]);
  const [marginLeft, setMarginLeft] = useState(0);

  const createNoteBlock = (color) => {
    setNoteBlocks([...noteBlocks, { id: uuidv4(), color }]);
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
          />
        ))}
      </div>
    </div>
  );
};

export default App;
