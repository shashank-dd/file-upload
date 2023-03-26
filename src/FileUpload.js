// import React, { useState } from 'react';
// import axios from 'axios';
// import { uploadFileToS3 } from './s3';

// const FileUpload = () => {
//   const [videoUrl, setVideoUrl] = useState('');
//   const [uploadProgress, setUploadProgress] = useState(0);

//   const handleFileUpload = async (acceptedFiles) => {
//     const file = acceptedFiles[0];
//     if (!file) {
//       return;
//     }
//     if (file.type !== 'video/mp4') {
//       alert('Please select an mp4 file.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const response = await axios.post('/upload', formData, {
//         onUploadProgress: (progressEvent) => {
//           const progress = Math.round(
//             (progressEvent.loaded / progressEvent.total) * 100
//           );
//           setUploadProgress(progress);
//         },
//       });
  
//       const s3Response = await uploadFileToS3(file, (progress) => {
//         setUploadProgress(progress);
//       });

//       setVideoUrl(s3Response.Location);
//       setUploadProgress(0);
//     } catch (error) {
//       console.error(error,11111);
//     }
//   };

//   return (
//     <div>
//       <div
//         style={{
//           width: '400px',
//           height: '400px',
//           border: '2px dashed black',
//         }}
//         onDrop={(event) => {
//           event.preventDefault();
//           handleFileUpload(event.dataTransfer.files);
//         }}
//         onDragOver={(event) => {
//           event.preventDefault();
//         }}
//       >
//         <p>Drag and drop a video file here, or click to select a file.</p>
//       </div>
//       {videoUrl && (
//         <video width="400" controls>
//           <source src={videoUrl} type="video/mp4" />
//         </video>
//       )}
//       {uploadProgress > 0 && (
//         <progress value={uploadProgress} max="100">
//           {uploadProgress}%
//         </progress>
//       )}
//     </div>
//   );
// };

// export default FileUpload;
import React, { useState } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import { uploadFileToS3 } from './s3';
import p from "./Screenshot (208).png"

const FileUpload = () => {
  const [filesz, setFilesz] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileUpload = async (files) => {
    const file = files[0]
  
    if (!file) {
      return;
    }
    if (file.type !== 'video/mp4') {
      alert('Please select an mp4 file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);


    try {
      const response = await axios.put('/upload', formData, {
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          );
          setUploadProgress(progress);
        },
      });
  
      const s3Response = await uploadFileToS3(file, (progress) => {
        setUploadProgress(progress);
      });

      setVideoUrl(s3Response.Location);
      setUploadProgress(0);
      console.log(files[0],99999)
      setFilesz(files[0])
    } catch (error) {
      console.error(error,11111);
      console.log(files[0],99999)
      setFilesz(files[0])
      setUploadProgress(0);
    }
  };
console.log(uploadProgress,"oo")
  return (
    <div>
        {filesz && (
        <video controls className='v'>
          <source src={URL.createObjectURL(filesz)} type="video/mp4" />
        </video>
      )}
      <Dropzone accept="video/mp4"  onDrop={ handleFileUpload}>
        {({getRootProps, getInputProps}) => (
          <div {...getRootProps()}   style={{
            position:"relative",
            margin:"40px auto 0px",
            width: '400px',
            height: '400px',
            border: '2px dashed black',
          }}>
            <input {...getInputProps()} />
            <div className='i'><img src={p} className="im"></img> <p className='p'>Drag 'n' drop some files here, or click to select files</p></div>
           
          </div>
        )}
      </Dropzone>
    
     
      {uploadProgress > 0 && (
        <progress style={{width:"500px",margin:"0px 500px"}} value={uploadProgress} max="100">
          {uploadProgress}%
        </progress>
      )}
    </div>
  );
};

export default FileUpload;
