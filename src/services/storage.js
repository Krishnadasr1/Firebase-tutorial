import { storage } from '../config/firebase.js';

export const uploadFile = async (filePath, buffer) => {
  try {
    const bucket = storage.bucket();
    const file = bucket.file(filePath);
    
    await file.save(buffer, {
      metadata: {
        contentType: 'auto'
      }
    });

    const [url] = await file.getSignedUrl({
      action: 'read',
      expires: '03-01-2500'
    });

    return url;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

export const deleteFile = async (filePath) => {
  try {
    const bucket = storage.bucket();
    const file = bucket.file(filePath);
    await file.delete();
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
};