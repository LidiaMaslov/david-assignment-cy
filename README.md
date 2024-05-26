# Cypress

## Introduction

Watch the [Youtube Video](https://youtu.be/Wr0gch-lWwE)!

- This project is created with Cypress
- I used Cypress Commands to create Component Accessor methods
- This way I improved readability of the code
```javascript
cy.modalWindow('Account').then(() => {
    cy.subMenu('Advanced').click()
})
```
- Also hidden away the element action logic
    - subMenu finds a line where toggle exists
    - toggleOn switches a toggle state
```javascript
cy.subMenu('Use SSL').toggleOn()
```
- And the code
```javascript
Cypress.Commands.add('toggleOn', { prevSubject: 'element' }, (subject) => {
  cy.wrap(subject)
    .should('have.attr', 'data-typename', 'SettingsItemOnOffButton')
    .highlight() // demo for testing
    .invoke('attr', 'id')
    .then((id) => {
      return cy.get(`#${id} [data-typename="Thumb"]`) // toggle button
        .highlight() // demo for testing
        .trigger('mousedown', 20, 20, { force: true })
        .trigger('mousemove', 50, 20, { force: true })
        .trigger('mouseup', 50, 20, { force: true });
    });
});
```

## Installation

[To install cypress](https://bun.sh/docs/installation)

```bash
bun install
```

To run:

```bash
bunx cypress open
```

In Cypress -> E2E Testing -> Chrome -> Click `setup.cy.js`

## Important

- Please see the code in
    - Test `cypress/e2e/setup.cy.js`
    - Commands `cypress/support/commands.js`

## Thoughts

- **iPad Interface**
  - The interface is clearly divided into distinct parts.
  - The `data-typename` attribute helps in identifying the different sections of each component.
    - Some IDs are lengthy, but they are:
      - Helpful for identifying parts of the ID in complex scenarios, leading to the creation of `containsPartialId`.
  - I like the way to develop specific methods for each component, enhancing the readability of the test code.

- **Cypress**
  - Cypress recommends a procedural style, similar to the test script you gave to me. The organization typically includes:
    - Reusable steps.
    - Component-specific methods.
    - Custom Cypress commands.
    - Extensive use of `test-data` attributes.
  - Page Objects can be used in Cypress, resembling Java Page Objects.
  - The development process with Cypress is faster than with Java, thanks to:
    - Hot-reloading.
    - The ability to run specific parts of tests.
    - A user-friendly debugging interface.
    - The feature to pause the user interface.
      - Cypress runs in a GUI process and halts all other processes, enhancing stability.
    - Cypress is more stable by default.
      - For example Cypress can scroll lists to find an element, Selenium - will fail.  


