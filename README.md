# Cypress

## Introduction

[Video](https://youtu.be/Wr0gch-lWwE)

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
    - toggleOn toggles a toggle to specific state
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

## Thoughts

- **iPad Interface**
  - The interface has clearly defined parts.
  - The `data-typename` attribute helps identify the different sections of each component.
    - Some IDs are too long, but they are:
      - Useful for Page Objects.
      - Useful to match a part of the ID in a difficult case. Created `containsPartialId`
  - It's possible to create specific methods for each component, making the code easier to read.

- **Cypress**
  - The Cypress approach uses a procedural style similar to the test script you provided. The code is often organized into:
    - Reusable steps.
    - Component-specific methods.
    - Custom Cypress commands.
    - Extensive use of `test-data` attributes.
  - Page Objects can also be implemented in Cypress, looking very similar to Java Page Objects code.
  - The development cycle with Cypress is quicker than with Java due to:
    - Hot-reloading.
    - Ability to run parts of tests.
    - A nice debugging interface.
    - The ability to pause the user interface.
      - Cypress operates in a GUI process and stops all other processes, making it much more stable.

