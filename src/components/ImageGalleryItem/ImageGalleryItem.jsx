import { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'components/Modal/Modal';

export default function ImageGalleryItem({ searchTerm, page }) {
  const ApiKey = '38531038-07b18ea2bd70e8e8bef0f3931';
  const [images, setImages] = useState([]);
  const [siteLoaded, setSiteLoaded] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchImageData = () => {
    axios
      .get(
        `https://pixabay.com/api/?q=${searchTerm}&page=${page}&key=${ApiKey}&image_type=photo&orientation=horizontal&per_page=20`
      )
      .then(response => {
        const newImages = response.data.hits;

        if (newImages.length < 20 && hasMore === true && page > 1) {
          setHasMore(false);
          alert('No more images'); // tymczasowo
        }

        if (newImages.length === 0) {
          return alert('No images found');
        }
        setImages(prevImages => {
          // Prevent double images load from page 1 after website loads
          if (!siteLoaded) {
            setSiteLoaded(true);
            return [...response.data.hits];
          }
          // If loaded and Scrolled OR Load More button clicked
          // console.log(response.data);
          return [...prevImages, ...response.data.hits];
        });
      })
      .catch(error => {
        console.error('Error fetching image data:', error);
      });
  };

  useEffect(() => {
    if (searchTerm && page === 1) {
      // Clear the images only when a new search is performed
      setImages([]);
      setHasMore(true);
    }

    fetchImageData();
  }, [searchTerm, page]);

  const [selectedImageUrl, setSelectedImageUrl] = useState(null);

  const handleImageClick = imageUrl => {
    setSelectedImageUrl(imageUrl);
  };

  return (
    <>
      {images.map(img => (
        <li key={img.id}>
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
              <b>Likes</b> {img.likes}
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
    </>
  );
}
