import { useEffect, useState } from "react";
import { fetchPhotos } from "../../utility/unsplash";
import _ from "lodash";

import Gallery from "../../components/gallery/Gallery";

import type { PhotoType } from "../../types/unsplash";

import "./Home.css";

function Home() {
  const [photos, setPhotos] = useState<PhotoType[]>([]);
  const [page, setPage] = useState<number>(1);

  const getPhotos = _.throttle(async function () {
    const newPhotos = await fetchPhotos(page);

    setPhotos((p) => [...p, ...newPhotos]);
  }, 300);

  useEffect(() => {
    getPhotos();
  }, [page]);

  // Watch scroll height to determine whether to fetch
  // next page of photos.
  useEffect(() => {
    /**
     * `scrollTop` – number of pixels that an element's content is scrolled vertically
     *    (can be seen as the top of the viewport).
     * `clientHeight` – if on the documentElement (html element – in this case, yes),
     *    browser's viewport height.
     * `scrollHeight` – the height of element's (html element in this case) content
     *    (including the content which isn't visible on the screen) + the vertical padding.
     */
    const handleScroll = (event: Event) => {
      const html = document.documentElement;

      // If scrolled past 95% of the page's contents, fetch new page of photos.
      if ((html.clientHeight + html.scrollTop) / html.scrollHeight >= 0.95) {
        setPage((p) => p + 1);
      }
    };

    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="home">
      <Gallery photos={photos} />
    </div>
  );
}

export default Home;
