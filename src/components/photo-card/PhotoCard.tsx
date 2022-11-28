import type { PhotoType } from "../../types/unsplash";

import "./PhotoCard.css";

type Props = {
  photo: PhotoType;
};

function PhotoCard({ photo }: Props) {
  return (
    <a className="card" href={photo.user.links.html} target="_blank">
      <img
        className="card__photo"
        src={photo.urls.regular}
        alt={photo.description}
      />
    </a>
  );
}

export default PhotoCard;
