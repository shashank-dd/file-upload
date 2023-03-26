import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import './App.css';

const FileUploader = () => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleDrop = (files) => {
    setFile(files[0]);
    setIsUploading(true);
  };

  return (
    <div className="file-uploader">
      <Dropzone accept="video/mp4" onDrop={handleDrop}>
        {({getRootProps, getInputProps}) => (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
          </div>
        )}
      </Dropzone>
      {isUploading && <ProgressBar />}
      {file && (
        <video controls className='v'>
          <source src={URL.createObjectURL(file)} type="video/mp4" />
        </video>
      )}
    </div>
  );
};

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);

  // simulate progress with setInterval
  setInterval(() => {
    setProgress(progress => progress + 10);
  }, 500);

  return <div className="progress-bar" style={{width: `${progress}%`}} />;
};

export default FileUploader;
