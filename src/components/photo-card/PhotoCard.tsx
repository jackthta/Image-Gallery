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
    <a className="card" href={photo.user.links.html} target="_blank">
      <img
        className="card__photo"
        src={photo.urls.regular}
        alt={photo.description}
      />
      {PhotoDescription}
    </a>
  );
}

export default PhotoCard;
