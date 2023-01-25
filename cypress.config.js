const { defineConfig } = require("cypress")
const { verifyDownloadTasks } = require('cy-verify-downloads')
const fs = require('fs')

module.exports = defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on),
        on('task', verifyDownloadTasks),
        on('task', {
          emptyDownloadsFolder(folderPath) {
            return new Promise((resolve, reject) => {
              fs.readdir(folderPath, (err, files) => {
                if (err) {
                  reject(err)
                }
                files.forEach(file => {
                  fs.unlink(`${folderPath}/${file}`, (err) => {
                    if (err) {
                      reject(err)
                    }
                  })
                })
                resolve('Downloads folder is empty')
              })
            })
          }
        }),
        require('@cypress/grep/src/plugin')(config)
        return config
    },
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    chromeWebSecurity: false,
  },
  env: {
    // Grep options for triggering tests
    grepFilterSpecs: true,
    iphone: 'iphone-8'
  },
  retries: {
    runMode: 2,
    openMode: 2
  }
})


