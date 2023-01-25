import { homePage } from "../support/page_objects/HomePage"
import { commonUtilsPage } from "../support/page_objects/CommonPage"

describe('Validate QR code generator', function () {
    // this code block will execute once before all tests
    beforeEach('Navigate to HomePage', function () {
        // if mobile test, default is set to Desktop
        // cy.viewport('iphone-8')
        // visit QR Code generator page
        homePage.openHomePage()
        // disabled buttons for all types of inputs <url, phone, sms, etc> initially
        commonUtilsPage.validateDefaultPageSetup()
    })
    afterEach('Scroll page to top', function () {
        // scroll to top of page
        cy.scrollTo('top')
    })
    it('Validate functionality of the Create/Decode QR Code', { tags: ['@smoke', '@critical'] }, function () {
        // check for <active tab> for <HomePage>
        commonUtilsPage.validateActiveTab('URL', 'url')
        // verify collapse panel buttons state for <HomePage>
        commonUtilsPage.validateCollapsible()
        // url input field have a url value by <default>
        homePage.validateContentDefaultInputValue('https://www.qrcode-monkey.com')
        // create and validate QR code
        commonUtilsPage.validateCreatedQRCode()
        // create qr button should be disabled after QR creation
        commonUtilsPage.validateDisabledQRButton('be.disabled')
        // drag slider to the left or right
        commonUtilsPage.randomSliderDrag()
        // create qr button should not be disabled after
        commonUtilsPage.validateDisabledQRButton('not.be.disabled')
        // Validate if created QR code can be scanned/decoded correctly as per user input on <homepage>
        commonUtilsPage.validateQRCodeReaderInputText('https://www.qrcode-monkey.com')
        // Validate empty input content field validation on <homepage>
        homePage.validateEmptyInputTextFieldValidation()
    })
    it('Validate "Download QR Code in different formats"', { tags: ['@smoke', '@critical'] }, function () {
        // Create and validate QR code
        commonUtilsPage.validateCreatedQRCode()
        // Download QR as <Download PNG, .SVG, .PDF*, .EPS*> file
        commonUtilsPage.downloadQRFile('Download PNG')
        // Validate if file is downloaded
        commonUtilsPage.validateIfQRFileDownloaded('png')
    })
    it('Validate QR code customization options', { tags: '@smoke' }, function () {
        commonUtilsPage.customizeQRSetColorPanel('#778787', 'Radial Gradient')
        // create and validate QR code
        commonUtilsPage.validateCreatedQRCode()
        // customization via customize design panel
        commonUtilsPage.customDesignQRPanel()
        // create and validate QR code
        commonUtilsPage.validateCreatedQRCode()
    })
    it('Validate create a QR code with logo image', { tags: '@smoke' }, function () {
        // click on logo panel
        commonUtilsPage.clickLogoPanel()
        // select and apply logo image at random
        commonUtilsPage.selectAndApplyLogoImage()
        // create and validate QR code with applied Logo
        commonUtilsPage.validateCreatedQRCode()
        // remove and validate logo removal
        commonUtilsPage.validateRemoveLogo()
        // create and validate QR code and logo removed from QR
        commonUtilsPage.validateCreatedQRCode()
    })
    it('Validate if QR code from templates are correctly applied', { tags: '@smoke' }, function () {
        // click QR template
        commonUtilsPage.navigateToQRTemplates()
        // select a template at random
        commonUtilsPage.selectRandomQRTemplate()
        // create and validate QR code with applied QR template
        commonUtilsPage.validateCreatedQRCode()
    })
    it('Validate if QR sizing slider can be dragged horizontally', { tags: '@smoke' }, function () {
        // right drag the slider and validate
        commonUtilsPage.validateSliderRightDrag()
        // left drag the slider and validate
        commonUtilsPage.validateSliderLeftDrag()
    })
})