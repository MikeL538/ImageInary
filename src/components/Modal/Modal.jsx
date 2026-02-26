import { useEffect } from 'react';
import css from './Modal.module.scss';

export default function Modal({ imageUrl, onClose }) {
  useEffect(() => {
    if (!imageUrl) return;
    document.querySelector('body').style.overflow = 'hidden';

    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.querySelector('body').style.overflow = 'auto';
    };
  }, [onClose, imageUrl]);

  return (
    <>
      <div
        data-testid="image-modal-overlay"
        className={css.modal}
        onClick={onClose}
      >
        <img className={css.modalImage} src={imageUrl} alt="" />
      </div>
    </>
  );
}
