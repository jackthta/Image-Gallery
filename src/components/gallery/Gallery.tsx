import Photo from "../photo/Photo";

import type { PhotoType } from "../../types/unsplash";

import "./Gallery.css";

type Prop = {
  photos: PhotoType[];
};

function Gallery({ photos }: Prop) {
  return (
    <>
      {photos.map((photo, index) => (
        <Photo key={index} photo={photo} />
      ))}
    </>
  );
}

export default Gallery;
