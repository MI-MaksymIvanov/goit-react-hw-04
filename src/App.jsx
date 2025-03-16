import { useState } from "react";
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
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [hasMorePhotos, setHasMorePhotos] = useState(true);

  const handleSearch = async (searchQuery) => {
    setQuery(searchQuery);
    setPage(1);
    setPhotos([]);
    setHasMorePhotos(true);
    await fetchPhotos(searchQuery, 1);
  };

  const handleLoadMore = async () => {
    const nextPage = page + 1;
    setPage(nextPage);
    await fetchPhotos(query, nextPage);
  };

  const handleImageClick = (photo) => {
    setSelectedPhoto(photo);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  const fetchPhotos = async (searchQuery, page) => {
    if (!searchQuery) return;

    if (page === 1) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }
    setError(null);
    try {
      const data = await fetchPhoto(searchQuery, page);

      if (data.length === 0) {
        if (page === 1) {
          toast("Nothing found", {
            duration: 3000,
          });
        }
      } else {
        setPhotos((prevPhotos) => [...prevPhotos, ...data]);
        if (data.length < 12) {
          toast("End of collection", {
            duration: 3000,
          });
          setHasMorePhotos(false);
        }
      }
    } catch (error) {
      setError("Pls reload page...");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} initialQuery={query || ""} />
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      <ImageGallery photos={photos} onImageClick={handleImageClick} />
      {photos.length > 0 && !loading && !loadingMore && hasMorePhotos && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {loadingMore && <Loader />}
      <ImageModal onClose={closeModal} photo={selectedPhoto} />
      <Toaster position="top-center" />
    </>
  );
}

export default App;
