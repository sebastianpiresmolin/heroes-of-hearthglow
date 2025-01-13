describe('Navbar', () => {

    //desktop
    it('Navbar successfully loads and contains all elements', () => {
        cy.visit('/')
        cy.get('#navbar').should('be.visible')
            .find('#home-link-navbar')
            .should('exist')
            .and('be.visible')
            .get('#navbar')
            .find('#discord-link-navbar')
            .should('exist')
            .and('be.visible')
            .get('#navbar')
            .find('#youtube-link-navbar')
            .should('exist')
            .and('be.visible')
            .get('#navbar')
            .find('#steam-link-navbar')
            .should('exist')
            .and('be.visible');
    })

    //mobile
    it('Navbar successfully loads and contains all elements', () => {
        cy.viewport('iphone-x')
        cy.visit('/')
        cy.get('#navbar-menu-mobile').should('not.exist')

        cy.get('#navbar-menu-toggle-mobile').should('be.visible')
            .and("exist")
            .get('#navbar-menu-toggle-mobile').click();

        cy.get('#navbar-menu-mobile')
            .should('exist')
            .and('be.visible')

            .get('#navbar-menu-mobile')
            .find('#home-link-navbar-mobile')
            .should('exist')
            .and('be.visible')

            .get('#navbar-menu-mobile')
            .find('#steam-link-navbar-mobile')
            .should('exist')
            .and('be.visible')

            .get('#navbar-menu-mobile')
            .find('#discord-link-navbar-mobile')
            .should('exist')
            .and('be.visible')

            .get('#navbar-menu-mobile')
            .find('#youtube-link-navbar-mobile')
            .should('exist')
            .and('be.visible')

            .get('#navbar-menu-mobile')
            .find('#studio-logo-navbar-mobile')
            .should('exist')
            .and('be.visible')

            .get('#navbar-menu-mobile')
            .find('#studio-name-navbar-mobile')
            .should('exist')
            .contains('Ramen Cat Studios')
            .and('be.visible')

            .get('#navbar-menu-mobile')
            .find('#studio-copyright-navbar-mobile')
            .should('exist')
            .contains('© 2024 Ramen Cat Studios.All rights reserved.ramen@cat.email')
            .and('be.visible')

            .get('#navbar-menu-mobile')
            .find('#website-author-navbar-mobile')
            .should('exist')
            .contains('Website by Sebastian Molin');

        cy.get('#navbar-menu-toggle-mobile').should('be.visible')
            .and("exist")
            .get('#navbar-menu-toggle-mobile').click();

        cy.get('#navbar-menu-mobile').should('not.exist')


    })
})