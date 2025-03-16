import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

export default function ImageGallery({ photos, onImageClick }) {
  return (
    <ul className={css.imageGalleryList}>
      {photos.map((photo) => (
        <li key={photo.id} className={css.imageGalleryItem}>
          <ImageCard photo={photo} onImageClick={onImageClick} />
        </li>
      ))}
    </ul>
  );
}
