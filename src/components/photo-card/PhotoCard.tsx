import { useState } from "react";

import Photo from "../photo/Photo";
import PhotoCardModal from "../photo-card-modal/PhotoCardModal";

import type { PhotoType } from "../../types/unsplash";

import "./PhotoCard.css";

type Props = {
  photo: PhotoType;
};

function PhotoCard({ photo }: Props) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <button
        className="card"
        onClick={() => setModalOpen(true)}
        data-test="photo-card"
      >
        <Photo className="card__photo" photo={photo} />
      </button>

      {/* Modal for further details */}
      <PhotoCardModal
        isOpen={modalOpen}
        closeModal={() => setModalOpen(false)}
        photo={photo}
      />
    </>
  );
}

export default PhotoCard;
