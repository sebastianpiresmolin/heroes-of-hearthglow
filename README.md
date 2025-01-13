
# API DOCUMENTATION

https://jx6c5m7s4r.apidog.io

# TEST RUNNING

## Before running any test you need to run:
`npm install`

## E2E - Cypress test

Firstly, Make sure that port: **3000** is open, since it is the default port for this Next project and therefore the baseUrl for Cypress.
Then run:

`npm run build`
`npm run start`

and finally:

`npx cypress run --spec "cypress/e2e/**/*"`



