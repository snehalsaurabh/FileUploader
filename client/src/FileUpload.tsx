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
    console.log(status)
    try {
      const response = await fetch('http://localhost:3001/api/files/upload', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      });
  
      console.log("Response",response);
      if (response.ok) {
        setStatus('File uploaded successfully ✅');
        onUpload(); // Refresh list
      } else {
        const error = await response.text();
        setStatus(`Error uploading file: ${error}`);
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
      <p>{status}</p>
    </div>
  );
};

export default FileUpload;