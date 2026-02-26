import { useState } from 'react';
import Modal from 'components/Modal/Modal';
import Spinner from 'components/Loader/Loader';
import LoadMoreButton from 'components/LoadMoreButton/LoadMoreButton';

export default function ImageGalleryContent({
  images,
  isLoading,
  hasMore,
  error,
  hasScroll,
  setPage,
}) {
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);

  // MODAL select
  const handleImageClick = imageUrl => {
    setSelectedImageUrl(imageUrl);
  };

  return (
    <>
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
    </>
  );
}
