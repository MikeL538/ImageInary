import { useEffect, useState, useRef } from 'react';
import fetchPixabayImages from 'api/pixabay';
import Modal from 'components/Modal/Modal';
import Spinner from 'components/Loader/Loader';
import './ImageGallery.module.scss';
import LoadMoreButton from 'components/LoadMoreButton/LoadMoreButton';

export default function ImageGallery({ searchTerm }) {
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [hasScroll, setHasScroll] = useState();
  const scrollLockRef = useRef(false);

  // RESET
  useEffect(() => {
    setPage(1);
    setHasMore(true);
    setError(null);
    setHasScroll(true);
    setImages([]);
  }, [searchTerm]);

  // SCROLL
  useEffect(() => {
    const handleScroll = () => {
      if (isLoading || !hasMore || scrollLockRef.current) return;

      // Check height of document
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      // Check if scroll is at the bottom - 80px
      if (window.scrollY >= maxScroll - 80) {
        // Small protection against using infinte scroll two times
        scrollLockRef.current = true;
        window.scrollTo(0, maxScroll - 80);
        setTimeout(() => {
          setPage(prev => prev + 1);
        }, 200);
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

  // load images from API on mount and when page changes or search term changes
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
        if (error?.response?.status === 400) {
          setHasMore(false);
        }
      } finally {
        setIsLoading(false);
        scrollLockRef.current = false;
      }
    }

    loadImages();
  }, [searchTerm, page]);

  // Check if document has scroll, if not show load more button
  useEffect(() => {
    const checkHasScroll = () => {
      setHasScroll(document.documentElement.scrollHeight > window.innerHeight);
    };

    checkHasScroll();
    window.addEventListener('resize', checkHasScroll);

    return () => window.removeEventListener('resize', checkHasScroll);
  }, [images, isLoading]);

  return (
    <ul>
      {images.map(img => (
        <li key={img.id} data-id={img.id}>
          <button
            type="button"
            onClick={() => {
              handleImageClick(img.largeImageURL);
            }}
          >
            <img
              src={img.previewURL}
              alt={img.tags}
              loading="lazy"
              onError={e => {
                e.currentTarget.alt =
                  'Error while loading image - Click to load image';
                e.currentTarget.style.padding = '40px';
              }}
            />
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
          }}
        />
      )}
      {isLoading && <Spinner />}

      {error && <p>{error.message}</p>}

      {!hasMore && !isLoading && images.length > 0 && <p>No more images</p>}

      {!hasMore && !isLoading && images.length === 0 && <p>No images found</p>}
      {!hasScroll && hasMore && !isLoading && (
        <LoadMoreButton onLoadMore={() => setPage(prev => prev + 1)} />
      )}
    </ul>
  );
}
