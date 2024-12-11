import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

// 16 assignment. Tests were rewritten using randomly generated usernames and passwords created by the Faker application.
// modified run configurations
const URL = process.env.APP_URL || ' ' //https://fe-delivery.tallinn-learning.ee/signin'
test.beforeEach(async ({ page }) => {
  await page.goto(URL);
});

test('Check for incorrect credentials message and close pop up message', async ({ page }) => {
  const usernameField = page.getByTestId("username-input");  // may use page.locator("test")
  const passwordField = page.getByTestId("password-input");
  const signInButton = page.getByTestId("signIn-button");
  const errorPopUpMessage = page.getByTestId("authorizationError-popup");
  const closeButton = page.getByTestId("authorizationError-popup-close-button");

  await usernameField.fill(faker.internet.username());
  await passwordField.fill(faker.internet.password());
  await signInButton.click();
  await expect(errorPopUpMessage).toBeVisible();

  await closeButton.click();
  await expect(signInButton).toBeEnabled();
  console.log('Random username is: ', faker.internet.username())
  console.log('Random password is: ', faker.internet.password())
});

test('Check for error messages for login input', async ({ page }) => {
  const usernameField = page.getByTestId("username-input")
  const passwordField = page.getByTestId("password-input")
  const emptyErrorMessageForUserName = page.getByTestId('username-input-error').nth(0)
  const emptyErrorMessageForPassword  = page.getByTestId('username-input-error').nth(1)

  const emptyErrorMessageForShortUserName = page.getByText('The field must contain at least of characters: 2')
  const emptyErrorMessageForShortPassword = page.getByText('The field must contain at least of characters: 8')

  await usernameField.fill(faker.internet.username().substring(0, 1)); // Short username
  await expect(emptyErrorMessageForShortUserName).toBeVisible();

  await usernameField.fill("");
  await expect(emptyErrorMessageForUserName).toBeVisible();

  await passwordField.fill(faker.internet.password().substring(0, 7)); // Short password
  await expect(emptyErrorMessageForShortPassword).toBeVisible();

  await passwordField.fill("");
  await expect(emptyErrorMessageForPassword).toBeVisible();
  console.log('Random username for negative scenario is: ', faker.internet.username().substring(0, 1))
  console.log('Random password for negative scenario is: ', faker.internet.password().substring(0, 7))
});



