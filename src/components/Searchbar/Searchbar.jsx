import s from './Searchbar.module.css';
import PropTypes from 'prop-types';
import { useState } from 'react';
export default function Searchbar({ onSubmit }) {
  const [searchData, setSearchData] = useState('');
  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(searchData);
  };
  const handleChange = e => {
    const { value } = e.target;
    setSearchData(value);
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={s.SearchForm__button}>
          <span className={s.SearchForm__button__label}>Search</span>
        </button>

        <input
          className={s.SearchForm__input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </form>
    </header>
  );
}
Searchbar.protoType = {
  onSubmit: PropTypes.func.isRequired,
};