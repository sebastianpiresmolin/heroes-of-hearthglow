describe('The Login Page', () => {

  it('successfully loads', () => {
    cy.visit('/login')
  })

  it('successfully blocks mobile devices', () => {
    cy.viewport(550, 750)
    cy.visit('/login')
    cy.get('#mobileBlocker').should('be.visible')
  })

  it('successfully shows the login modal and it is complete', () => {
    cy.viewport(1920, 1080)
    cy.visit('/login')
    cy.get('#loginModal').should('be.visible')
    cy.get('#loginTitle').should('be.visible').and('have.text', 'Welcome')
    cy.get('#loginDescription').should('be.visible').and('have.text', 'Enter your username and password below to login')
    cy.get('#username').should('be.visible').and('have.attr', 'placeholder', 'username')
    cy.get('#password').should('be.visible').and('have.attr', 'placeholder', 'password')
    cy.get('#loginButton').should('be.visible').and('have.text', 'Login')
    cy.get('#loginError').should('not.be.visible');
    cy.get('#loginButton').click()
    cy.get('#loginError').should('be.visible').and('have.text', 'Invalid username or password.')
  })
})