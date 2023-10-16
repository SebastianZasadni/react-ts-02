import { useState, useEffect } from "react";
import Notiflix from "notiflix";

import { ImageGallery } from "./components/ImageGallery/ImageGallery";
import { Loader } from "./components/Loader/Loader";
import { Button } from "./components/Button/Button";
import { Modal } from "./components/Modal/Modal";
import css from "./Index.module.css";
import { fetchImages } from "./api/api";
import { Searchbar } from "./components/SearchBar/SearchBar";
import { Image } from "./components/ImageGallery/ImageGallery";

interface ResponseData {
  data: {
    hits: Image[];
    totalHits: number;
  }
}

interface Error {
  message: string;
}

const App: React.FC = () => {
  const [images, setImages] = useState<Image[] | []>([]);
  const [query, setQuery] = useState<string>("");
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = useState<number>(0);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [largeImg, setLargeImg] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: ResponseData = await fetchImages(query, page);
        const newData: Image[] = response.data.hits;
        const pages: number = Math.round(response.data.totalHits / 12);
        if (newData.length) {
          if (!isFormSubmitted && query) {
            setImages((prevImages) => [...prevImages, ...newData]);
          } else {
            setImages([...newData]);
            setTotalPages(pages);
            setIsFormSubmitted(false);
          }
        } else {
          setError({ message: "Images not found." });
        }
      } catch (error) {
        setIsLoading(false);
      } finally {
        setIsLoading(false);
        setIsFormSubmitted(false);
      }
    };
    setIsLoading(true);
    fetchData();
  }, [query, page, isFormSubmitted]);

  const openModal = (url: string, tags: string) => {
    setIsModal(true);
    setLargeImg(url);
    setTags(tags);
  };

  const closeModal = () => {
    setIsModal(false);
    setLargeImg("");
  };

  const loadHandle = () => {
    setIsLoading(true);
    setPage(page + 1);
    setIsFormSubmitted(false);
  };

  const handleSubmit = (searchedImages: string) => {
    setQuery(searchedImages);
    setPage(1);
    setError(null);
    setIsFormSubmitted(true);
  };

  return (
    <>
      {isModal ? (
        <Modal
          largeImageUrl={largeImg}
          onPress={() => closeModal()}
          onEscDown={() => closeModal()}
          tags={tags}
        />
      ) : (
        <Searchbar handleSubmit={handleSubmit} />
      )}
      {error ? (
        Notiflix.Notify.failure(
          `Whoops, something went wrong: ${error.message}`
        )
      ) : isLoading ? (
        <Loader />
      ) : query ? (
        <div className={css.mainSection}>
          <ImageGallery images={images} openModal={openModal} />
          {page !== totalPages ? <Button onButton={loadHandle} /> : null}
        </div>
      ) : null}
    </>
  );
};

export default App;
