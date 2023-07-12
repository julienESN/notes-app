import React from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <Sidebar />
      {/* Autres composants ici */}
    </div>
  );
};

export default App;
