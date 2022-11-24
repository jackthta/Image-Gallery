import type { PhotoType } from "../../types/unsplash";

import "./PhotoCard.css";

type Props = {
  photo: PhotoType;
};

function PhotoCard({ photo }: Props) {
  const PhotoDescription = photo.description && (
    <p className="card__description">{photo.description}</p>
  );

  return (
    <div className="card">
      <img
        className="card__photo"
        src={photo.urls.regular}
        alt={photo.description}
      />
      {PhotoDescription}
    </div>
  );
}

export default PhotoCard;
