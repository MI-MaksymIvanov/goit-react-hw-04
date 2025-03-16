import css from "./ImageCard.module.css";

export default function ImageCard({ photo, onImageClick }) {
  const { urls, alt_description } = photo;
  return (
    <div className={css.ImageCard} onClick={() => onImageClick(photo)}>
      <img
        className={css.imageCardImg}
        src={urls.small}
        alt={alt_description}
      />
    </div>
  );
}
