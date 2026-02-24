import { useState } from 'react';
import ContactModal from 'components/ContactModal/ContactModal';
import css from './Header.module.scss';

export default function Header({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isContactOpen, setIsContactOpen] = useState(false);

  function search(e) {
    e.preventDefault(); // Prevent page reload
    onSearch(searchTerm); // Pass search term to parent
    setSearchTerm(''); // Clear search term
  }

  return (
    <header className={css.header}>
      <div className={css.headerContainer}>
        <div className={css.logoContainer}>
          <button
            // When logo clicked, reloadd page and scroll to top
            onClick={() => {
              window.scrollTo(0, 0);
              window.location.reload();
            }}
            className={css.logoContainerButton}
            type="button"
          >
            <svg className={css.logo}>
              <use href={`${process.env.PUBLIC_URL}/icons.svg#logo`} />
            </svg>
            <h1 className={css.title}>ImageInary</h1>
          </button>
        </div>
        <form className={css.form} onSubmit={search}>
          {/* Search input */}
          <input
            type="text"
            id="searchInput"
            value={searchTerm}
            placeholder="Search images and photos"
            onChange={e => setSearchTerm(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
        <div className={css.copyrights}>
          <button
            className={css.copyrights__contact}
            onClick={() => {
              setIsContactOpen(true);
              document.querySelector('body').style.overflow = 'hidden';
            }}
          >
            Contact
          </button>

          <ContactModal
            isOpen={isContactOpen}
            onClose={() => setIsContactOpen(false)}
          />
          <p>Powered by</p>
          <svg className={css.copyrights__icon}>
            <use href={`${process.env.PUBLIC_URL}/icons.svg#pixabay`} />
          </svg>
          <div className={css.copyrights__container}>
            <a
              className={css.copyrights__link}
              href="https://pixabay.com/"
              target="_blank"
              rel="noreferrer"
            >
              Pixabay
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
