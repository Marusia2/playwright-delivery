## **Scenarios**
1. Check for error message for login input
2. Check for error message for password input
3. Check for incorrect credentials message and close pop up message


## **Selectors**
* usernameField - data-name="username-input"
* passwordFiled - data-name="password-input"
* signInButton - data-name="signIn-button"
* errorPopUpMessage - "authorizationError-popup"
* closeButton - "authorizationError-popup-close-button"

## **Random Data Generation**

npm install @faker-js/faker

## **Environment**

APP_URL='https://fe-delivery.tallinn-learning.ee/signin'

## **Run Application**

npx playwright test
or
npx playwright test --headed