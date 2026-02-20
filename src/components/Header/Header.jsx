/* eslint-disable */
import { useState } from 'react';
import css from './Header.module.scss';

export default function Header({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  function search(e) {
    e.preventDefault();
    onSearch(searchTerm);
  }

  function clearInput() {
    setTimeout(() => {
      setSearchTerm('');
    }, 0);
  }

  return (
    <header className={css.header}>
      <div className={css.logoContainer}>
        <button
          onClick={() => {
            window.scrollTo(0, 0);
            window.location.reload();
          }}
          className={css.logoContainer}
          type="button"
        >
          <svg className={css.logo}>
            <use href={`${process.env.PUBLIC_URL}/icons.svg#logo`} />
          </svg>
          <h1 className={css.title}>ImageInary</h1>
        </button>

        <a
          className={css.logo__contact}
          href="https://github.com/MikeL538"
          target="_blank"
          rel="noopener noreferrer"
        >
          Contact
        </a>
      </div>
      <form className={css.form} onSubmit={search}>
        <input
          type="text"
          id="searchInput"
          value={searchTerm}
          placeholder="Search images and photos"
          onChange={e => setSearchTerm(e.target.value)}
        />
        <button onClick={clearInput} type="submit">
          Search
        </button>
      </form>
      <div className={css.copyrights}>
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
    </header>
  );
}
