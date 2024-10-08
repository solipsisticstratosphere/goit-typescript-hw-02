import { useState, useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";
import "./App.css";
import { fetchImages, FetchImagesResponse, Image } from "../../images-api";
import ImageGallery from "../ImageGallery/ImageGallery";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import ImageModal from "../ImageModal/ImageModal";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";

function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");
  const [showBtn, setShowBtn] = useState<boolean>(false);

  useEffect(() => {
    if (query) {
      fetchImagesData();
    }
  }, [query, page]);

  const fetchImagesData = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(false);
      const data: FetchImagesResponse = await fetchImages(query, page);
      setImages((prevImages) => [...prevImages, ...data.results]);

      setShowBtn(data.total_pages !== page);
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (image: string): void => {
    setQuery(image);
    setPage(1);
    setImages([]);
  };

  const openModal = (image: Image): void => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const loadMore = (): void => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      {error && <ErrorMessage />}
      {loading && <Loader />}
      {images.length > 0 && (
        <>
          <ImageGallery items={images} onImageClick={openModal} />
          {showBtn && <LoadMoreBtn onClick={loadMore} />}
        </>
      )}
      {selectedImage && (
        <ImageModal
          isOpen={isModalOpen}
          onClose={closeModal}
          image={selectedImage}
        />
      )}
    </>
  );
}

export default App;
