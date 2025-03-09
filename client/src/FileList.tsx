import React, { useEffect, useState } from 'react';

interface File {
  id: number;
  originalName: string;
  key: string;
}

interface FileListProps {
  refresh: boolean;
}

const FileList: React.FC<FileListProps> = ({ refresh }) => {
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/files');
        const data = await response.json();
        setFiles(data);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };

    fetchFiles();
  }, [refresh]);

  const handleFileDownload = async (fileName: string) => {
    try {
      const response = await fetch(`http://localhost:3001/api/files/download/${fileName}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  return (
    <div className="file-list">
      <h2>Uploaded Files</h2>
      <table>
        <thead>
          <tr>
            <th>File Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file) => (
            <tr key={file.id}>
              <td>{file.originalName}</td>
              <td>
                <button onClick={() => handleFileDownload(file.key)}>Download</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FileList;