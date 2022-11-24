import PhotoCard from "../photo-card/PhotoCard";

import type { PhotoType } from "../../types/unsplash";

import "./Gallery.css";

type Prop = {
  photos: PhotoType[];
};

function Gallery({ photos }: Prop) {
  return (
    <>
      {photos.map((photo, index) => (
        <PhotoCard key={index} photo={photo} />
      ))}
    </>
  );
}

export default Gallery;
