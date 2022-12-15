describe("Search Bar", () => {
  const searchInput = "[data-test='search-input']";

  const whatToType = "I am typing something.";

  it("... will clear when header brand icon is clicked", () => {
    const searchBarClearButton = "[data-test='search-bar-clear']";

    cy.visit("/")
      // Type something into the search bar
      .get(searchInput)
      .type(whatToType)

      // Double check that it actually typed `whatToType`
      // inside the search input
      .invoke("attr", "value")
      .then((input) => {
        expect(input).to.eql(whatToType);
      })

      // Click the clear button to reset input
      .get(searchBarClearButton)
      .click()

      // Expect search input to be cleared
      .get(searchInput)
      .invoke("attr", "value")
      .then((input) => {
        expect(input).to.be.empty;
      });
  });

  it("... will clear search input when header brand icon is clicked", () => {
    const headerBrandIconButton = "[data-test='header-brand-button']";

    cy.visit("/")
      // Type something into the search bar
      .get(searchInput)
      .type(whatToType)

      // Double check that it actually typed `whatToType`
      // inside the search input
      .invoke("attr", "value")
      .then((input) => {
        expect(input).to.eql(whatToType);
      })

      // Click the clear button to reset input
      .get(headerBrandIconButton)
      .click()

      // Expect search input to be cleared
      .get(searchInput)
      .invoke("attr", "value")
      .then((input) => {
        expect(input).to.be.empty;
      });
  });
});
