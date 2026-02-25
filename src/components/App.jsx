import { useState } from 'react';
import Header from './Header/Header';
import ImageGallery from './ImageGallery/ImageGallery';
// import LoadMoreButton from './LoadMoreButton/LoadMoreButton';
import './App.module.scss'; // jest używany jako moduł

export const App = () => {
  const [searchTerm, setSearchTerm] = useState('galaxy');

  const handleSearch = term => {
    setSearchTerm(term);
  };

  return (
    <>
      <Header onSearch={handleSearch} />
      <ImageGallery searchTerm={searchTerm} />
      {/* <LoadMoreButton /> */}
    </>
  );
};
