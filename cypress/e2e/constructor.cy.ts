const apiUrl = 'https://norma.nomoreparties.space/api';
const bunSelector = `[data-cy=643d69a5c3f7b9001cfa093c]`;
const fillingSelector = `[data-cy=643d69a5c3f7b9001cfa0941]`;
const buttonOrderSelector = `[data-cy=button-order]`;

const ingredientInConstructorSelector = `[data-cy=ingredient]`;
const topBunInConstructorSelector = `[data-cy=top-bun]`;
const bottomBunInConstructorSelector = `[data-cy=bottom-bun]`;

const noIngredientsSelector = `[data-cy=no-ingredients]`;
const noBunSelector = `[data-cy=no-bun]`;

const modalContainerSelector = '#modals';
const modalOverlaySelector = `[data-cy=modal-overlay]`;

beforeEach(() => {
  cy.intercept('GET', `${apiUrl}/ingredients`, {
    fixture: 'ingredients.json'
  });
  cy.intercept('POST', `${apiUrl}/auth/login`, {
    fixture: 'user.json'
  })
  cy.intercept('GET', `${apiUrl}/auth/user`, {
    fixture: 'user.json'
  })
  cy.intercept('POST', `${apiUrl}/orders`, {
    fixture: 'order.json'
  })


  cy.visit('/');

  window.localStorage.setItem(
    'user',
    JSON.stringify(
      {
        "success": true,
        "accessToken": "Bearer test",
        "refreshToken": "test",
        "user": {
          "email": "test@gmail.com",
          "name": "test"
        }
      }
    )
  )
})

afterEach(() => {
  window.localStorage.clear();
})

describe('добавление ингредиента из списка в конструктор', () => {
  it('добавление булки', () => {
    cy.get(bunSelector).children('button').click();

    cy.get(topBunInConstructorSelector).find('.constructor-element__text').contains('Краторная булка N-200i');
    cy.get(bottomBunInConstructorSelector).find('.constructor-element__text').contains('Краторная булка N-200i');
 })

  it('добавление ингредиента', () => {
    cy.get(fillingSelector).children('button').click();

    cy.get(ingredientInConstructorSelector).find('.constructor-element__text').contains('Биокотлета из марсианской Магнолии');
  })
})

describe('работа модальных окон', () => {
  it('открытие окна информации о ингредиенте', () => {
    cy.get(modalContainerSelector).should('be.empty');
    cy.get(bunSelector).click();
    cy.get(modalContainerSelector).should('be.not.empty');

    cy.get(modalContainerSelector).find('h3').contains('Краторная булка N-200i');
  })

  it('закрытие модального окна при клике на крестик', () => {
    cy.get(modalContainerSelector).should('be.empty');
    cy.get(bunSelector).click();
    cy.get(modalContainerSelector).should('be.not.empty');

    cy.get(modalContainerSelector).find("button").click()
    cy.get(modalContainerSelector).should('be.empty');
  })

  it('закрытие модального окна при клике на крестик', () => {
    cy.get(modalContainerSelector).should('be.empty');
    cy.get(bunSelector).click();
    cy.get(modalContainerSelector).should('be.not.empty');

    cy.get(modalOverlaySelector).click({ force: true });
    cy.get(modalContainerSelector).should('be.empty');
  })
});

describe('создание заказа', () => {
  it('создание заказа', () => {
    cy.get(bunSelector).children('button').click();
    cy.get(fillingSelector).children('button').click();
    cy.get(buttonOrderSelector).click();

    cy.get(modalContainerSelector).should('be.not.empty');
    cy.get(modalContainerSelector).find("h2").contains('61862');
    cy.get(modalContainerSelector).find("button").click();
    cy.get(modalContainerSelector).should('be.empty');

    cy.get(noIngredientsSelector).should('be.visible');
    cy.get(noBunSelector).should('be.visible');
  });
});
