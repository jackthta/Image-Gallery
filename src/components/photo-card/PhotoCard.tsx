import type { PhotoType } from "../../types/unsplash";

import "./PhotoCard.css";

type Props = {
  photo: PhotoType;
};

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

function PhotoCard({ photo }: Props) {
  const photoWidths = generatePhotoWidths();
  const photoURLs = generatePhotoURLs(photo, photoWidths);
  const photoSrcSet = photoURLsToImgSrcSet(photoURLs, photoWidths);

  // NOTE: Calculated photo `sizes` by subtracting
  // container max-width of 1200px, column gutter size (if
  // applicable), and container side padding.
  return (
    <a className="card" href={photo.user.links.html} target="_blank">
      <img
        className="card__photo"
        srcSet={photoSrcSet}
        sizes="
        (min-width: 64em) calc(1200px - calc(1.25rem * 2) - 2rem),
        (min-width: 37.5em) calc(1200px - 1.75rem - 2rem),
          calc(1200px - 2rem)
        "
        src={photoURLs[0]}
        alt={photo.description}
        loading="lazy"
        decoding="async"
      />
    </a>
  );
}

export default PhotoCard;
