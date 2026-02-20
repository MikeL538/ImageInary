/* eslint-disable */
import { useState } from 'react';
import css from './Searchbar.module.scss';

export default function Searchbar({ onSearch }) {
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
      <h1 className={css.title}>ImageInary</h1>
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
        <p>Powered by </p>
        <img
          src="https://pixabay.com/static/img/pixabay-logo.svg"
          alt="pixabay"
        />
      </div>
    </header>
  );
}
