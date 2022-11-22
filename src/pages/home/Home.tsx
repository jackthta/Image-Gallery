import { useEffect, useState } from "react";
import { fetchPhotos } from "../../utility/unsplash";

import Gallery from "../../components/gallery/Gallery";

import type { PhotoType } from "../../types/unsplash";

function Home() {
  const [photos, setPhotos] = useState<PhotoType[]>([]);

  useEffect(() => {
    const getPhotos = async function () {
      const photos = await fetchPhotos();
      setPhotos(photos);
    };

    getPhotos();
  }, []);

  return (
      <Gallery photos={photos} />
  );
}

export default Home;
