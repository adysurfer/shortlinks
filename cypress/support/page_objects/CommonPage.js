export class CommonPage {
    validateDefaultPageSetup() {
        cy.contains('button', 'Download PNG').should('be.disabled')
        // disabled for all types of inputs <url, phone, sms, etc> initially
        cy.contains('button', '.SVG').should('be.disabled')
        // disabled for all types of inputs <url, phone, sms, etc> initially
        cy.contains('button', '.PDF*').should('be.disabled')
        // disabled for all types of inputs <url, phone, sms, etc> initially
        cy.contains('button', '.EPS*').should('be.disabled')
        // check slider default values
        cy.get('[role="slider"]').should('have.attr', 'aria-valuenow', 1000)
            .and('have.attr', 'aria-valuemin', 200)
            .and('have.attr', 'aria-valuemax', 2000)
        // scroll to top of page
        cy.scrollTo('top')
    }
    validateActiveTab(activeTabName, validAttr) {
        // check for active tab content 
        cy.contains('a', activeTabName)
            .should('have.class', 'tab active')
            .and('have.attr', 'href')
            .and('include', validAttr)
    }
    validateCollapsible() {
        // verify collapse panel buttons state
        cy.get('div[class="accordion"]').children('div.pane').then(function ($el) {
            // first panel <enter content> is always active(expanded) by default
            cy.wrap($el).eq(0).should('have.class', 'active')
            // All other panels should not be active(collapsed) by default
            for (let i = 1; i < $el.length; i++) {
                cy.wrap($el).eq(i).should('not.have.class', 'active')
            }
        })
    }
    validateCreatedQRCode() {
        // spy on POST request to createQR endpoint
        cy.intercept('POST', '//qr/custom').as('createQR')
        // Generate QR Code
        cy.contains('button', 'Create QR Code').click()
        // wait until request is complete and assert responde status code
        // QR successfully created/generated
        cy.wait('@createQR').its('response.statusCode').should('eq', 200)
    }
    validateDisabledQRButton(assert) {
        cy.contains('button', 'Create QR Code').should(assert)
    }
    validateQRCodeReaderInputText(userInputText) {
        cy.get('[class="card-img-top"]')
            .readCode()
            .should('have.property', 'text', userInputText)
    }
    downloadQRFile(type) {
        cy.window().document().then(function (doc) {
            doc.addEventListener('click', () => {
                // this adds a listener that reloads your page 
                // after 15 seconds from clicking the download button 
                // refresh the page to bypass cypress unwanted loading
                setTimeout(function () { doc.location.reload() }, 15000)
            })
            // Download QR as Download PNG, .SVG, .PDF*, .EPS* file
            cy.contains('button', type).click()
        })
    }
    validateIfQRFileDownloaded(fileExt) {
        //empty downloads folder, then validate if file is actually downloaded
        cy.task('emptyDownloadsFolder', 'cypress/downloads/').then((result) => {
            cy.log(result)
            // verify if the file is downloaded
            cy.verifyDownload(`qr-code.${fileExt}`)
        })
    }
    customizeQRSetColorPanel(gradientColor1, gradientType) {
        // customization via set colors panel
        cy.contains('Set Colors').click()
        // single option checked by default
        cy.get('[value="single"]').should('be.checked')
        // select other radio button option
        cy.get('[value="gradient"]').check()
        // clear and input new color value
        cy.get('[ng-model="qrcode.config.gradientColor1"]').clear().type(gradientColor1)
        // select radial
        cy.get('[ng-model="qrcode.config.gradientType"]').select(gradientType)
    }
    customDesignQRPanel() {
        cy.contains('Customize Design').click()
        // randomly select on categories
        cy.get('.shape-options').each(function ($el) {
            cy.wrap($el).find('[class="shape ng-scope"]').eq(Math.floor(Math.random() * 7)).click({ force: true })
        })
    }
    clickLogoPanel() {
        // Click on logo panel
        cy.contains('Add Logo Image').click()
    }
    selectAndApplyLogoImage() {
        // randomly select on logo categories option
        cy.get('.shape-options').each(function ($el) {
            cy.wrap($el).find('[class="shape ng-scope"]').eq(Math.floor(Math.random() * 7)).click({ force: true })
        })
        // validate logo applied
        cy.get('[ng-hide="qrcode.config.logo"]').should('have.class', 'ng-hide')
    }
    validateRemoveLogo() {
        // remove logo
        cy.contains('button', 'Remove Logo').click()
        // validate logo removed
        cy.get('[ng-hide="qrcode.config.logo"]').should('not.have.class', 'ng-hide')
    }
    navigateToQRTemplates() {
        // click on QR template 
        cy.contains('button', ' QR Code Templates').click()
    }
    selectRandomQRTemplate() {
        // click on random template
        cy.get('[ng-if="showTemplates"]').then(function ($el) {
            cy.wrap($el).eq(Math.floor(Math.random() * $el.length)).click()
        })
    }
    validateSliderLeftDrag() {
        // slide left and assert current values
        // left click 8 times on slider and assert current value
        cy.get('span[role="slider"]').focus().type("{leftarrow}{leftarrow}{leftarrow}{leftarrow}{leftarrow}{leftarrow}{leftarrow}{leftarrow}").then(function ($el) {
            expect(parseInt($el.attr('aria-valuenow'))).to.equal(900)
        })
    }
    validateSliderRightDrag() {
        // right click 4 times on slider and assert current value
        cy.get('span[role="slider"]').focus().type("{rightarrow}{rightarrow}{rightarrow}{rightarrow}").then(function ($el) {
            expect(parseInt($el.attr('aria-valuenow'))).to.equal(1100)
        })
    }
    randomSliderDrag() {
        cy.get('span[role="slider"]').focus().type("{rightarrow}")
    }
}

export const commonUtilsPage = new CommonPage()