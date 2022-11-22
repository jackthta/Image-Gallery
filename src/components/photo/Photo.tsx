import type { PhotoType } from "../../types/unsplash";

type Props = {
  photo: PhotoType;
};

function Photo({ photo }: Props) {
  return <img src={photo.urls.regular} alt={photo.description} />;
}

export default Photo;
