import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import fetchImagesWithQuery from 'pixabay api/api';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import s from './App.module.css';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const [searchData, setSearchData] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(0);
  const [largeImage, setLargeImage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isMoreBtnHide, setIsMoreBtnHide] = useState(false);
  useEffect(() => {
    if (!page) {
      return;
    }
    const response = fetchImagesWithQuery(searchData, page);
    response
      .then(({ data }) => {
        if (data.hits.length < 12) {
          setIsMoreBtnHide(true);
        }
        if (data.total === 0) {
          setIsLoading(false);
          return toast.info('Sorry, nothing was found for your search');
        }
        const normalizedImages = data.hits.map(
          ({ id, webformatURL, largeImageURL }) => ({
            id,
            webformatURL,
            largeImageURL,
          })
        );
        setImages(images => [...images, ...normalizedImages]);
      })
      .catch(error => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page, searchData]);

  const onSubmit = newSearchData => {
    if (newSearchData.trim() === '') {
      return toast.error('Enter the meaning for search');
    } else if (newSearchData === searchData) {
      return;
    }
    setSearchData(newSearchData);
    setPage(1);
    setImages([]);
    setIsMoreBtnHide(false);
  };

  const nextPage = () => {
    setPage(p => p + 1);
  };

  const openModal = index => {
    setShowModal(true);
    setLargeImage(images[index].largeImageURL);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className={s.App}>
      <Searchbar onSubmit={onSubmit} />
      {error && <p>Ups! Something went wrong!</p>}
      {images.length !== 0 && (
        <ImageGallery images={images} openModal={openModal} />
      )}
      {showModal && <Modal toggleModal={toggleModal} largeImage={largeImage} />}
      {isLoading && <Loader />}
      <ToastContainer autoClose={2500} />
      {images.length > 0 && !isLoading && !isMoreBtnHide && (
        <Button nextPage={nextPage} />
      )}
    </div>
  );
}

