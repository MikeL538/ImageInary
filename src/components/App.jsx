/* eslint-disable */
import { useState, useEffect } from 'react';
import Header from './Header/Header';
import ImageGallery from './ImageGallery/ImageGallery';
import LoadMoreButton from './LoadMoreButton/LoadMoreButton';

// import hasmore
import css from './App.module.scss';

export const App = () => {
  const [searchTerm, setSearchTerm] = useState('galaxy');
  const [page, setPage] = useState(1);

  const handleSearch = term => {
    setSearchTerm(term);
    setPage(1);
  };

  const handleLoadMore = () => {
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;

    if (window.scrollY >= maxScroll - 120) setPage(prev => prev + 1);

    return;
  };

  useEffect(() => {
    window.addEventListener('scroll', handleLoadMore);

    return () => {
      window.removeEventListener('scroll', handleLoadMore);
    };
  }, [page]);

  return (
    <>
      <Header onSearch={handleSearch} />
      <ImageGallery searchTerm={searchTerm} page={page} />
      <LoadMoreButton onLoadMore={handleLoadMore} />
    </>
  );
};
