import s from './Button.module.css';
import PropTypes from 'prop-types';

export default function Button({ nextPage, isLoading }) {
  return (
    <button
      type="button"
      className={s.Button}
      onClick={nextPage}
      disabled={isLoading}
    >
      Load more
    </button>
  );
}
Button.propTypes = {
  nextPage: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};