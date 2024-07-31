import React from 'react';
import ImageToggleForm from './ImageToggleForm'

const App: React.FC = () => {
  const generateImageUrls = (baseUrl: string, count: number): string[] => {
    return Array.from({ length: count }, (_, index) => `${baseUrl}/${index + 1}.jpg`);
  };

  const images = generateImageUrls('https://storage.googleapis.com/photo-survey', 25); // Adjust the count as needed


  const handleFormSubmit = (selectedImages: string[]) => {
    console.log('Selected images:', selectedImages);
  };

  return (
    <div style={{textAlign: 'center'}}>
      <h1>Select Images</h1>
      <p>Hey, thanks for your help! Tap a photo to select (red boarder appears). Tap again to deselect. </p>
      <ImageToggleForm images={images} onSubmit={handleFormSubmit} />
    </div>
  );
};

export default App