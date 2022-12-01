import { useEffect, useRef, MouseEvent } from "react";

import Photo from "../photo/photo";

import instagram_icon from "../../assets/instagram.svg";
import twitter_icon from "../../assets/twitter.svg";
import unsplash_icon from "../../assets/unsplash.svg";
import close_icon from "../../assets/close.svg";

import type { PhotoType } from "../../types/unsplash";

import "./PhotoCardModal.css";

type Props = {
  isOpen: boolean;
  closeModal: () => void;
  photo: PhotoType;
};

function PhotoCardModal({ isOpen, closeModal, photo }: Props) {
  const modal = useRef<HTMLDialogElement | null>(null);

  const hasInstagram = photo.user.instagram_username != null;
  const hasTwitter = photo.user.twitter_username != null;

  const intlDateFormat: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "2-digit",
    year: "numeric",
  };
  const createdDate = new Intl.DateTimeFormat("en-US", intlDateFormat).format(
    new Date(photo.created_at)
  );

  const handleCloseModal = () => {
    // NOTE: Can close the modal just by invoking
    // `closeModal` since the updated `false` state
    //  in the parent will remove the `PhotoCardModal`
    //  from the DOM essentially destroying/closing it.
    //  Used here for completeness.
    modal.current?.close();
    closeModal();
  };

  // NOTE: This is not a robust solution. Click dragging
  // where your cursor ends up on the backdrop during the
  // click-up action will trigger this.
  const handleCloseModalOnBackdropClick = (
    e: MouseEvent<HTMLDialogElement>
  ) => {
    const eventTarget = e.target as HTMLDialogElement;
    const clickedOnBackdrop = eventTarget.tagName.toUpperCase() === "DIALOG";

    if (clickedOnBackdrop) handleCloseModal();
  };

  useEffect(() => {
    if (isOpen) modal.current?.showModal();
  }, []);

  useEffect(() => {
    // Disable scrolling on main page while modal is open.
    document.body.style.overflow = "hidden";
    return () => {
      // Enable back scrolling on main page when modal
      // is closed.
      document.body.style.overflow = "auto";
    };
  });

  useEffect(() => {
    // The `cancel` event happens on the <dialog>
    // when the "Escape" key is pressed.
    //   Source: https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/cancel_event
    modal.current?.addEventListener("cancel", () => {
      // Invoke `handleCloseModal` when native <dialog>'s
      // "Escape" mechanism is triggered.
      handleCloseModal();
    });
    return () => {
      modal.current?.removeEventListener("cancel", () => {
        handleCloseModal();
      });
    };
  });

  return (
    <dialog
      className="modal"
      ref={modal}
      onClick={handleCloseModalOnBackdropClick}
    >
      {/* Modal header */}
      <div className="modal__header">
        {/* Author profile image & full name */}
        <div className="modal__header__profile">
          <img
            className="modal__header__profile-image"
            src={photo.user.profile_image.large}
            alt={`${photo.user.name}'s profile image`}
          />
          <a
            className="modal__header__profile-name"
            href={photo.user.links.html}
            target="_blank"
          >
            {photo.user.name}
          </a>
        </div>
        {/* Close modal button */}
        <button
          className="modal__header__close-button"
          onClick={handleCloseModal}
        >
          <img
            className="modal__header__close__icon"
            src={close_icon}
            alt="Close 'x' icon"
          />
        </button>
      </div>
      {/* Modal photo */}
      <Photo photo={photo} />
      {/* Modal contents */}
      <div className="modal__content">
        {/* Created date */}
        <p className="modal__content__created-date">
          <span>Posted</span>
          <span>{createdDate}</span>
        </p>

        {/* Description */}
        <p className="modal__content__description">
          <span>Description</span>
          <span>{photo.description ?? "--"}</span>
        </p>
      </div>
      <div className="modal__footer">
        {/* User social media links */}
        <div className="modal__footer__author-socials">
          {/* Instagram */}
          {hasInstagram && (
            <a
              href={`https://www.instagram.com/${photo.user.instagram_username}`}
              target="_blank"
            >
              <img src={instagram_icon} alt="Instagram icon" />
            </a>
          )}
          {/* Twitter */}
          {hasTwitter && (
            <a
              href={`https://twitter.com/${photo.user.twitter_username}`}
              target="_blank"
            >
              <img src={twitter_icon} alt="Twitter icon" />
            </a>
          )}
          {/* Unsplash */}
          <a href={photo.user.links.html} target="_blank">
            <img src={unsplash_icon} alt="Unsplash icon" />
          </a>
        </div>
      </div>
    </dialog>
  );
}

export default PhotoCardModal;

// Keeping this work here as a reference and learning
// lesson. The note detailed below shows my initial obstacle
// until I learned of <dialog>'s "cancel" event (more 
// info where the "cancel" event listener is added to `modal`).

// NOTE: Unsure how to pass `handleCloseModal` to the
// native <dialog>'s "Escape" close mechanism, so that
// the close state can be sync'd on the parent.
// This solution works, but there are some strange
// edge cases where this doesn't get triggered on
// pressing "Escape".
// E.g.:
//   1. Click dragging the image, then pressing "Escape"
//      won't ever seem to trigger this callback, but triggers
//      the native <dialog>'s "Escape" mechanism, leading to
//      a weirdly formed modal that's "stuck" but can be manually
//      closed via clicking the close button.
// const handleEscKey = (pressed: KeyboardEvent<HTMLDialogElement>) => {
//   if (pressed.key === "Escape") handleCloseModal();
// };

// `onKeyDown={handleEscKey}` on <dialog>
