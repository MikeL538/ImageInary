import { useEffect, useState } from 'react';
import fetchPixabayImages from 'api/pixabay';
import Modal from 'components/Modal/Modal';
import Spinner from 'components/Loader/Loader';
import './ImageGallery.module.scss';

export default function ImageGallery({ searchTerm }) {
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);

  // RESET
  useEffect(() => {
    setPage(1);
    setHasMore(true);
    setError(null);
    setImages([]);
  }, [searchTerm]);

  // SCROLL
  useEffect(() => {
    const handleScroll = () => {
      if (isLoading || !hasMore) return;

      // Check height of document
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      // Check if scroll is at the bottom - 120px
      if (window.scrollY >= maxScroll - 120) {
        // Small protection against using infinte scroll two times
        window.scrollTo(0, maxScroll - 120);
        setPage(prev => prev + 1);
      }
    };
    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    // Clean up scroll listener on unmount or when hasMore changes to prevent memory leak
    return () => window.removeEventListener('scroll', handleScroll);
    // Depends on isLoading and hasMore
  }, [isLoading, hasMore]);

  // MODAL select
  const handleImageClick = imageUrl => {
    setSelectedImageUrl(imageUrl);
  };

  useEffect(() => {
    setIsLoading(true);

    async function loadImages() {
      try {
        const response = await fetchPixabayImages(searchTerm, page);
        const hits = response.hits;
        const PER_PAGE = 20;

        const totalAvailable = response.totalHits;
        const maxPages = Math.ceil(totalAvailable / PER_PAGE);

        // po udanym fetchu:
        setHasMore(page < maxPages && hits.length > 0);

        setImages(prev => {
          const base = page === 1 ? [] : prev;
          const merged = [...base, ...hits];

          const seen = new Set();
          return merged.filter(item => {
            const key = item.id;
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
          });
        });
      } catch (error) {
        setError(error);
        console.log(error);
        if (error?.response?.status === 400) {
          setHasMore(false);
        }
      } finally {
        setIsLoading(false);
      }
    }

    loadImages();
  }, [searchTerm, page]);

  return (
    <ul>
      {images.map(img => (
        <li key={img.id} data-id={img.id}>
          <button
            type="button"
            onClick={() => {
              handleImageClick(img.largeImageURL);
              document.querySelector('body').style.overflow = 'hidden';
            }}
          >
            <img src={img.webformatURL} alt={img.tags} loading="lazy" />
          </button>
          <div>
            <p>
              <b>Likes</b>
              {img.likes}
            </p>
            <p>
              <b>Views</b> {img.views}
            </p>
            <p>
              <b>Comments</b> {img.comments}
            </p>
            <p>
              <b>Downloads</b> {img.downloads}
            </p>
          </div>
        </li>
      ))}

      {selectedImageUrl && (
        <Modal
          imageUrl={selectedImageUrl}
          onClose={() => {
            setSelectedImageUrl(null);
            document.querySelector('body').style.overflow = 'auto';
          }}
        />
      )}
      {isLoading && <Spinner />}

      {error && <p>{error.message}</p>}

      {!hasMore && !isLoading && <p>No more images</p>}
    </ul>
  );
}
