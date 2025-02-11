import { useState } from "react";

const cloudinary_url = 'https://api.cloudinary.com/v1_1';
const cloudinary_upload_preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const cloudinary_cloud_name = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;


const getMediaTypes = (type) => {
  if (type.includes('image')) return 'image';
  if (type.includes('video')) return 'video';
  return 'raw';
};

const HandleFileUpload = async (file) => {
  const [media, setMedia] = useState([]);
  if (!file) return;

  const mediaType = getMediaTypes(file.type);
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', cloudinary_upload_preset);

  try {
    const response = await fetch(`${cloudinary_url}/${cloudinary_cloud_name}/${mediaType}/upload`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (data.secure_url) {
      setMedia([...media, data.secure_url]);
    }
  } catch (error) {
    console.error('Error subiendo el archivo:', error);
    alert('Error subiendo el archivo');
  }
};

export default HandleFileUpload;