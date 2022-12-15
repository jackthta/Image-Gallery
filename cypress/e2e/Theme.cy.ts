describe("Theme Switch", () => {
  it("... will change color scheme when clicked", () => {
    const themeSwitch = "[data-test='theme-switch']";

    cy.visit("/")
      .get("[data-theme]")
      .invoke("attr", "data-theme")
      .then((initialTheme) => {
        // Click theme switch button to change theme
        cy.get(themeSwitch).click();

        // Expect new [data-theme] value to be toggled
        cy.get("[data-theme]")
          .invoke("attr", "data-theme")
          .then((newTheme) => {
            switch (initialTheme) {
              case "dark":
                expect(newTheme).to.eql("light");
                break;

              case "light":
                expect(newTheme).to.eql("dark");
                break;
            }
          });
      });
  });
});
