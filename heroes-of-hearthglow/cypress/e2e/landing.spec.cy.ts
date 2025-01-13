describe('The Landing Page', () => {

    it('successfully loads with all elements', () => {
        cy.visit('/')
        cy.get('#landing').should('be.visible').and('exist')
        cy.get('#titleAndLogo').should('be.visible').and('exist')
        cy.get('#scrollToExplore').should('be.visible').and('exist').contains('Scroll to explore')
        cy.get('#arrowDownLanding').should('be.visible').and('exist')
    })

})