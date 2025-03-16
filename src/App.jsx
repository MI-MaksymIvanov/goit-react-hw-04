import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { fetchPhoto } from "./unsplash-api";

import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";

import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    setPage(1);
    setPhotos([]);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleImageClick = (photo) => {
    if (!showModal) {
      setSelectedPhoto(photo);
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPhoto(null);
  };

  useEffect(() => {
    if (!query) return;

    async function getPhotos() {
      if (page === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }
      setError(null);
      try {
        const data = await fetchPhoto(query, page);
        if (data.length === 0) {
          if (page === 1) {
            toast("Nothing found", {
              duration: 3000,
            });
          } else {
            toast("End of collection", {
              duration: 3000,
            });
          }
        } else {
          setPhotos((prevPhotos) => [...prevPhotos, ...data]);
        }
      } catch (error) {
        setError("Pls reload page...");
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    }

    getPhotos();
  }, [query, page]);

  return (
    <>
      <SearchBar onSubmit={handleSearch} initialQuery={query || ""} />
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      <ImageGallery photos={photos} onImageClick={handleImageClick} />
      {photos.length > 0 && !loading && !loadingMore && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {loadingMore && <Loader />}
      <ImageModal
        isOpen={showModal}
        onRequestClose={closeModal}
        photo={selectedPhoto}
      />
      <Toaster position="top-center" />
    </>
  );
}

export default App;
