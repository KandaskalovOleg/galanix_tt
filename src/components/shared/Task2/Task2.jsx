/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import { useState, useEffect } from 'react';
import imagesData from './../../../assets/data/data.json';
import './Task2.css';

export const Task2 = () => {
  const images = imagesData.images;

  const [selectedImage, setSelectedImage] = useState(null);
  const [deletedImageIds, setDeletedImageIds] = useState(() => {
    const storedDeletedImageIds = localStorage.getItem('deletedImageIds');
    return storedDeletedImageIds ? JSON.parse(storedDeletedImageIds) : [];
  });
  const [visibleImageCount, setVisibleImageCount] = useState(images.length - deletedImageIds.length);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    localStorage.setItem('deletedImageIds', JSON.stringify(deletedImageIds));
    updateVisibleImageCount();
  }, [deletedImageIds]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const updateVisibleImageCount = () => {
    setVisibleImageCount(images.length - deletedImageIds.length);
  };


  const handleRestoreImages = () => {
    setDeletedImageIds([]);
    scrollToTop();
  };

  const handleDeleteImage = (imageId) => {
    setDeletedImageIds((prevDeletedImageIds) => [...prevDeletedImageIds, imageId]);
    scrollToTop();
  };

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  
  return (
    <div className="container">
      <div className="page-info">
        <p>{`Images counter: ${visibleImageCount}`}</p>
        <p>{`Date: ${currentDate.toLocaleString()}`}</p>
      </div>
      <div className="image-grid">
        {images.map((image) => (
          !deletedImageIds.includes(image.id) && (
            <div key={image.id} className="image-container">
              <img
                src={image.src}
                alt={image.alt}
                onClick={() => handleImageClick(image)}
              />
              <span
                className="delete-button"
                onClick={() => handleDeleteImage(image.id)}
              >
                х
              </span>
            </div>
          )
        ))}
      </div>
      {selectedImage && (
        <div className="overlay">
          <div className="modal">
            <img 
              src={selectedImage.src} 
              alt={selectedImage.alt}
              className="loaded"
            />
            <button 
              className="close-button"
              onClick={() => setSelectedImage(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      <button className="restore-button" onClick={handleRestoreImages}>
        <p>Restore deleted</p>
      </button>
    </div>
  );
};
