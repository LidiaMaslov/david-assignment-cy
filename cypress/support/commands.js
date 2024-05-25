import 'cypress-iframe';

Cypress.Commands.add('highlight', { prevSubject: 'element' }, (subject) => {
  cy.wrap(subject).then($element => {
    $element.css('border', '2px solid green');
    console.log($element.html());
  });
});

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

Cypress.Commands.add('desktopIcon', (label) => {
  return cy.get("div[data-typename='DesktopIcon']")
    .contains(label)
    .parent();
});

Cypress.Commands.add('mainMenu', (label) => {
  return cy.get("div[data-typename='SettingsItemMainMenu']")
    .contains(label)
    .parent();
});

Cypress.Commands.add('subMenu', (label) => {
  return cy.get("[data-typename*='SettingsItem']")
    .contains(label)
    .parent();
});

Cypress.Commands.add('containsPartialId', { prevSubject: 'element' }, (subject, partialId) => {
  return cy.wrap(subject).find(`[id*="${partialId}"]`);
});

Cypress.Commands.add('modalWindow', (label) => {
  return cy
    .contains('[data-typename="HeaderedContentControl"]', label)
    .parent().parent()
    .wait(500); // Wait fixed transition animation time
});

Cypress.Commands.add('modalButton', (label) => {
  return cy.contains('[data-typename="ButtonArrow"]', label);
});


