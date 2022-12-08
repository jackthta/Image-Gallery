import { useRef, useEffect, useState } from "react";

import { Blurhash } from "react-blurhash";

import type { PhotoType } from "../../types/unsplash";

import "./Photo.css";

type Props = {
  className?: string;
  photo: PhotoType;
  inModal?: boolean;
};

/**
 * `Photo` component is responsive via <img> `srcset`
 * and `sizes` attributes.
 */
function Photo({ className, photo, inModal = false }: Props) {
  const mobileDimensions = "(max-width: 37.49em)";
  const tabletDimensions = "(min-width: 37.5em) and (max-width: 63.99em)";
  const desktopDimensions = "(min-width: 64em)";

  const photoRef = useRef<HTMLImageElement | null>(null);

  const [photoLoaded, setPhotoLoaded] = useState(false);

  const photoWidths = generatePhotoWidths();
  const photoURLs = generatePhotoURLs(photo, photoWidths);
  const photoSrcSet = photoURLsToImgSrcSet(photoURLs, photoWidths);

  /**
   * NOTE:
   * Obstacle using Blurhash:
   *   - Difficult to know on hand what the rendered width/height should be
   *   - Setting width/height: 100% works for width but not with height,
   *       probably because the photos have varying aspect ratios.
   * Solution:
   *   - Unsplash API returns the photo intrinsic width/height. We also know
   *     the rendered width by doing calc(`100vw` - `container side padding` - `<PhotoCard> side padding`).
   *   - We just need to solve this equation to find the rendered height:
   *       [(rendered width) / (intrinsic width)] = [(y) / (intrinsic height)] | where `y` is the rendered height
   *     ↪️ (y) = [(rendered width) × (intrinsic height)] / (intrinsic width)
   */
  let photoRenderedWidth;
  const photoIntrinsicWidth = photo.width;
  const photoIntrinsicHeight = photo.height;
  /**
   * `photoRenderedWidth` is calculated by:
   *  [[(desktopDimensions ? 1200px : 100vw) - (container side padding) - (total of each <PhotoCard>'s side padding) - (total of each grid column gap – if exists)] / (number of grid columns)]
   */
  if (inModal) {
    if (matchMedia(mobileDimensions).matches) {
      photoRenderedWidth = `100vw`;
    } else if (
      matchMedia(tabletDimensions).matches ||
      matchMedia(desktopDimensions).matches
    ) {
      photoRenderedWidth = `80vw`;
    }
  } else {
    if (matchMedia(mobileDimensions).matches) {
      photoRenderedWidth = `calc(100vw - 2rem - 2rem)`;
    } else if (matchMedia(tabletDimensions).matches) {
      photoRenderedWidth = `calc(calc(100vw - 2rem - 4rem - 1.75rem) / 2)`;
    } else if (matchMedia(desktopDimensions).matches) {
      photoRenderedWidth = `calc(calc(1200px - 2rem - 6rem - 2.5rem) / 3)`;
    }
  }
  const photoRenderedHeight = `calc(calc(${photoRenderedWidth} * ${photoIntrinsicHeight}
  }) / ${photoIntrinsicWidth})`;

  // Show <Photo> and hide <Blurhash> when image loads fully.
  const handlePhotoLoaded = () => setPhotoLoaded(true);

  // Makes sure the `photoLoaded` state is true
  // if the image is loaded from cache.
  useEffect(() => {
    if (photoRef.current?.complete) handlePhotoLoaded();
  }, []);

  return (
    <>
      {/*
        NOTE: Encountered bug while trying to use lazy loading.
        I'm hypothesizing that lazy loaded images aren't triggering
        the "load" event even after the image fully loads, so 
        the `photoLoaded` state is never updated properly (leading to
        an ever-present blurhash). I also noticed that when scrolling
        below the fold, no network requests are logged to the Network
        tab in DevTools, yet new images are rendering in the DOM (w/ `display:
        none` b/c the `photoLoaded` state never updates to switch it.. since 
        the "load" event callback never gets invoked).

        Using eager loading seems to fix the issue encountered above, although
        at a performance cost..
      */}
      <img
        className={className}
        style={{
          width: photoRenderedWidth,
          height: photoRenderedHeight,
          display: photoLoaded ? "block" : "none",
        }}
        ref={photoRef}
        srcSet={photoSrcSet}
        sizes={photoRenderedWidth}
        src={photoURLs[0]}
        alt={photo.description}
        loading="eager"
        onLoad={handlePhotoLoaded}
      />

      {!photoLoaded && photo.blur_hash && (
        <Blurhash
          className={`${!inModal && "blurhash"}`}
          hash={photo.blur_hash}
          style={{
            width: photoRenderedWidth,
            height: photoRenderedHeight,
            display: photoLoaded ? "none" : "block",
          }}
        />
      )}
    </>
  );
}

/**
 * Return a list of all width options for photos.
 * Widths: 100 -> 1200 (increments of 100), 1296
 *         1400 -> 2400 (increments of 200), 2592
 */
function generatePhotoWidths(): number[] {
  const widths = [];

  for (let width = 100; width <= 1200; width += 100) {
    widths.push(width);
  }

  widths.push(1296);

  for (let width = 1400; width <= 2400; width += 200) {
    widths.push(width);
  }

  widths.push(2592);

  return widths;
}

/**
 * Generate a list of photo URLs with
 * all widths in `sizes`.
 * Format: "`photo.urls.raw`&w=`width`"
 */
function generatePhotoURLs(photo: PhotoType, widths: number[]): string[] {
  return widths.map((width) => `${photo.urls.raw}&w=${width}`);
}

/**
 * Formats all `photoURLs` to be compatible for
 * HTML `img` element's `srcset` attribute consumption.
 */
function photoURLsToImgSrcSet(photoURLs: string[], widths: number[]): string {
  let imgSrcSet = "";

  photoURLs.forEach((photoURL, i) => {
    const width = widths[i];
    imgSrcSet += `${photoURL} ${width}w,`;
  });

  return imgSrcSet;
}

export default Photo;
