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
  
      console.log('Response status:', response.status); // Should be 200
      const result = await response.json();
      console.log('Response data:', result); // Log response content
  
      if (response.ok) {
        setStatus(result.message || 'File uploaded successfully ✅');
        onUpload(); // Refresh list
      } else {
        setStatus(result.message || 'Unexpected error occurred');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setStatus('Error uploading file ❌');
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