/// <reference types="cypress" />

describe('TestOut Ipad Interface', () => {
    it('Pass the assignment', () => {
        cy.visit('https://testoutlivecontent.blob.core.windows.net/netpro2018v5-en-us/en-us/sims/typescriptv1/netpro2018v5/simstartup_webpack.html?package=netpro2018v5windowspackage&sim=ipademail_np5&dev=true&automation=true')
        cy.viewport(1920, 1080)
    /*
        Set the email account to use SSL and the secure port 993 as follows: 
        a. Select Settings. 
        b.  Select Mail, Contacts, Calendars. 
        c.    Select Maggie Brown. 
        d.    Select mbrown@gmail.com. 
        e.    Select Advanced. 
        f.      Slide the button to enable Use SSL. 
        g.      Verify that the server port is set to 993. 
        h.      At the top, select Account. 
        i.    Click Done. 
    */
        cy.get('#Desktop', { timeout: 60000 }).should('be.visible')

        cy.desktopIcon('Settings').click()

        cy.mainMenu('Mail, Contacts, Calendars').click()
        cy.subMenu('Maggie Brown').click()
        cy.subMenu("mbrown@gmail.com").click()

        cy.modalWindow('Account').then(() => {
            cy.subMenu('Advanced').click()
        })

        cy.modalWindow('Advanced').then(() => {
            cy.subMenu('Server Port').find('input')
                .should('have.value', '143')
            cy.subMenu('Use SSL').toggleOn()
            cy.subMenu('Server Port').find('input')
                .should('have.value', '993')
            cy.modalButton('Account').click()
        })

        cy.modalWindow('Account').then(() => {
            cy.modalButton('Done').click()
        })

    /*
        Connect to CorpNet-Wireless Wi-Fi as follows: 
        a. Click Wi-Fi. 
        b.   Click CorpNet. 
        c.     In the Password field, enter @CorpNetWeRSecure!& as the password. 
        d.     Click Join. 
    */
        cy.mainMenu('Wi-Fi').click()
        cy.subMenu('CorpNet').click()
        cy.subMenu('Password').type('@CorpNetWeRSecure!&')
        cy.modalButton('Join').click()

    // At the end of the test click the “Done” button verify that the simulation scores 100%
        cy.contains('Done').click()
        cy.iframe('#_ifrmreport_', { timeout: 60000 })
            .contains('div', 'Your Score:')
            .highlight()
            .should('contain.text', 'Your Score: 1 of 1 (100%)')

        cy.wait(10000)
    })

})

