import { useEffect, useRef, useState } from "react";
import { fetchPhotos } from "../../utility/unsplash";
import _ from "lodash";

import Gallery from "../../components/gallery/Gallery";

import type { PhotoType } from "../../types/unsplash";

import "./Home.css";

function Home() {
  const mobileDimensions = "(max-width: 37.49em)";
  const tabletDimensions = "(min-width: 37.5em) and (max-width: 63.99em)";
  const desktopDimensions = "(min-width: 64em)";

  const dimensionCategory = useRef("");

  const [photos, setPhotos] = useState<PhotoType[][]>([[]]);
  const [page, setPage] = useState<number>(1);

  const throttledGetPhotos = _.throttle(async function () {
    const newPhotos = await fetchPhotos(page);

    // Mobile — append new photos to single column.
    if (matchMedia(mobileDimensions).matches) {
      dimensionCategory.current = "mobile";

      setPhotos((p) => {
        const flatPhotos = p.flat();

        return [[...flatPhotos, ...newPhotos]];
      });

      return;
    }

    // Tablet — split new photos in half
    // and append half portions to two columns.
    if (matchMedia(tabletDimensions).matches) {
      dimensionCategory.current = "tablet";

      setPhotos((p) => {
        let split = Math.round(newPhotos.length / 2);
        const firstHalfNewPhotos = newPhotos.slice(0, split);
        const secondHalfNewPhotos = newPhotos.slice(split);

        // Avoid re-flattening and splitting photos when
        // unnecessary since it's already in tablet dimensions
        // and there are two sub-arrays in `photos`.
        if (p.length === 2) {
          return [
            [...p[0], ...firstHalfNewPhotos],
            [...p[1], ...secondHalfNewPhotos],
          ];
        } else {
          // Otherwise, `photos` may be empty (from fresh page refresh)
          return [firstHalfNewPhotos, secondHalfNewPhotos];
        }
      });

      return;
    }

    // Desktop — split new photos in thirds
    // and append portions to the three columns.
    if (matchMedia(desktopDimensions).matches) {
      dimensionCategory.current = "desktop";

      setPhotos((p) => {
        const split = Math.round(newPhotos.length / 3);
        const firstChunkNewPhotos = newPhotos.slice(0, split);
        const secondChunkNewPhotos = newPhotos.slice(split, split * 2);
        const thirdChunkNewPhotos = newPhotos.slice(split * 2);

        // Avoid re-flattening and splitting photos when
        // unnecessary since it's already in desktop dimensions
        // and there are three sub-arrays in `photos`.
        if (p.length === 3) {
          return [
            [...p[0], ...firstChunkNewPhotos],
            [...p[1], ...secondChunkNewPhotos],
            [...p[2], ...thirdChunkNewPhotos],
          ];
        } else {
          // Otherwise, `photos` may be empty (from fresh page refresh)
          return [
            firstChunkNewPhotos,
            secondChunkNewPhotos,
            thirdChunkNewPhotos,
          ];
        }
      });

      return;
    }
  }, 300);

  // Fetch `page` of photos every page increment, starting from 1.
  useEffect(() => {
    throttledGetPhotos();
  }, [page]);

  /**
   * 1. Watch scroll height to determine whether to fetch next page of photos.
   * 2. Watch window resize to transform `photos` to contain the proper amount
   *    of columns per dimension category (mobile, tablet, desktop).
   */
  useEffect(() => {
    /**
     * `scrollTop` – number of pixels that an element's content is scrolled vertically
     *    (can be seen as the top of the viewport).
     * `clientHeight` – if on the documentElement (html element – in this case, yes),
     *    browser's viewport height.
     * `scrollHeight` – the height of element's (html element in this case) content
     *    (including the content which isn't visible on the screen) + the vertical padding.
     */
    const handleScroll = () => {
      const html = document.documentElement;

      // If scrolled past 95% of the page's contents, fetch new page of photos.
      if ((html.clientHeight + html.scrollTop) / html.scrollHeight >= 0.95) {
        setPage((p) => p + 1);
      }
    };

    /**
     * When transitioning into dimension breakpoints (mobile, tablet, desktop),
     * transform `photos` to contain the appropriate amount of subarrays (i.e.,
     * columns) for that respective dimension.
     */
    const handleWindowResize = () => {
      /**
       * If resizing from desktop or tablet dimensions to mobile,
       * flatten `photos` into 1-D and update `photos` state.
       */
      if (matchMedia(mobileDimensions).matches) {
        if (
          dimensionCategory.current === "desktop" ||
          dimensionCategory.current === "tablet"
        ) {
          dimensionCategory.current = "mobile";

          setPhotos((p) => [p.flat()]);

          return;
        }

        // Catches resizing within mobile dimensions,
        // so it doesn't leak to the below branches.
        return;
      }

      /**
       * If resizing from desktop or mobile dimensions to tablet,
       * flatten `photos` into 1-D, split into 2-D arrays,
       * and update `photos` state.
       */
      if (matchMedia(tabletDimensions).matches) {
        if (
          dimensionCategory.current === "desktop" ||
          dimensionCategory.current === "mobile"
        ) {
          dimensionCategory.current = "tablet";

          setPhotos((p) => {
            const flatPhotos = p.flat();
            const split = Math.round(flatPhotos.length / 2);
            const firstChunkPhotos = flatPhotos.slice(0, split);
            const secondChunkPhotos = flatPhotos.slice(split);

            return [firstChunkPhotos, secondChunkPhotos];
          });

          return;
        }

        // Catches resizing within tablet dimensions,
        // so it doesn't leak to the below branch.
        return;
      }

      /**
       * If resizing from tablet or mobile dimensions to desktop,
       * flatten `photos` into 1-D, split into 3-D arrays,
       * and update `photos` state.
       */
      if (matchMedia(desktopDimensions).matches) {
        if (
          dimensionCategory.current === "tablet" ||
          dimensionCategory.current === "mobile"
        ) {
          dimensionCategory.current = "desktop";

          setPhotos((p) => {
            const flatPhotos = p.flat();
            const split = Math.round(flatPhotos.length / 3);
            const firstChunkPhotos = flatPhotos.slice(0, split);
            const secondChunkPhotos = flatPhotos.slice(split, split * 2);
            const thirdChunkPhotos = flatPhotos.slice(split * 2);

            return [firstChunkPhotos, secondChunkPhotos, thirdChunkPhotos];
          });

          return;
        }

        // Catches resizing within desktop dimensions,
        // for consistency.
        return;
      }
    };

    document.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleWindowResize);
    return () => {
      document.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return <Gallery photos={photos} />;
}

export default Home;
