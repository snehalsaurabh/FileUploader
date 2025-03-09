import React, { useState } from 'react';

interface FileUploadProps {
  onUpload: () => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onUpload }) => {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleFileUpload = async () => {
    if (!file) {
      alert('Please select a file first');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:3001/api/files/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setStatus(result.message);
        onUpload(); // Trigger refresh
      } else {
        setStatus(result.message);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setStatus('Error uploading file');
    }
  };

  return (
    <div className="file-upload">
      <input type="file" id="file" onChange={handleFileChange} />
      <label htmlFor="file">Choose File</label>
      {file && <p className="file-name">Selected file: {file.name}</p>}
      <button onClick={handleFileUpload}>Upload</button>
      {status && <p>{status}</p>}
    </div>
  );
};

export default FileUpload;