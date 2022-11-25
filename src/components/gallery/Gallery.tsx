import _ from "lodash";

import PhotoCard from "../photo-card/PhotoCard";

import type { PhotoType } from "../../types/unsplash";

import "./Gallery.css";

type Prop = {
  photos: PhotoType[][];
};

function Gallery({ photos }: Prop) {
  return (
    <>
      {photos.map((photoList: PhotoType[], index) => {
        return (
          <div className="gallery" key={index}>
            {photoList.map((photo, index) => {
              return <PhotoCard key={index} photo={photo} />;
            })}
          </div>
        );
      })}
    </>
  );
}

export default Gallery;
