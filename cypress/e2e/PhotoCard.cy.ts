const photoCard = "[data-test='photo-card']";
const photoCardModal = "[data-test='photo-card-modal']";
const photoCardModalCloseButton = "[data-test='photo-card-modal-close']";

describe("Photo Card", () => {
  it("... will open photo card modal when clicked", () => {
    cy.visit("/")

      // Click on first photo card
      .get(photoCard)
      .first()
      .click()

      // Photo card modal should be visible
      .get(photoCardModal)
      .should("be.visible");
  });
});

describe("Photo Card Modal", () => {
  beforeEach(() => {
    cy.visit("/")

      // Click on first photo card
      .get(photoCard)
      .first()
      .click();
  });

  it("... will close modal when close button is clicked", () => {
    // Click on photo card modal's close button
    cy.get(photoCardModalCloseButton)
      .click()

      // Expect modal to not exist/be present anymore
      .get(photoCardModal)
      .should("not.exist");
  });

  it("... will close modal when HTMLDialogElement 'cancel' event is triggered", () => {
    // Trigger "cancel" event to close modal via HTMLDialogElement API
    cy.get(photoCardModal)
      .trigger("cancel")

      // Expect modal to not exist/be present anymore
      .get(photoCardModal)
      .should("not.exist");
  });
});
