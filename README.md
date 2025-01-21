# Heroes of Heartglow Web App
This is the currently in development web app for the pc game Heroes of Hearthglow developed by Tempura Tabby.

## Running the Application
### Pre-Requisites
There are pre-requisites to being able to run the code.
You need `node.js` installed and you need access to the evironment variables.
If you want to access the environment variables please contact me here on github through direct messages.
Make sure that port: **3000** is open, since it is the default port for this Next project.

Then:

Navigate to: `C:../heroes-of-hearthglow/heroes-of-hearthglow`

Run: `npm install`

### Developer environment
`npm run dev` - This starts the development server on `localhost:3000` by default.

### Run Normally
`npm run build`

`npm start`

Now the application is running on `https://localhost:3000` by default.

## Running Tests

### Pre-Requisites
Navigate to: `C:../heroes-of-hearthglow/heroes-of-hearthglow`

`npm install` if you have not done so previously.

### E2E - Cypress test
Make sure that port: **3000** is open, since it is the default port for this Next project and therefore the baseUrl for Cypress.
Then:

`npm run build`
`npm run start`

and finally:

`npx cypress run --spec "cypress/e2e/**/*"`

### Unit test - Jest
Navigate to: `C:../heroes-of-hearthglow/heroes-of-hearthglow`

run: `npm run test` or `npm run test:watch`if you want to run the tests with hot reload.

## The dashboard
To access the dashboard you need to go to the localhost:3000/login endpoint.

The development credentials are:

`username`

`password`

## API Documentation
https://jx6c5m7s4r.apidog.io
