import React, { useState } from 'react';
import FileUpload from './FileUpload';
import FileList from './FileList';
import './App.css';

const App: React.FC = () => {
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="App">
      <h1>File Uploader</h1>
      <FileUpload onUpload={handleRefresh} />
      <FileList refresh={refresh} />
    </div>
  );
};

export default App;