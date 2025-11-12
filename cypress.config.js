const { defineConfig } = require("cypress");
const dotenv = require('dotenv');

dotenv.config({ path: '.env.dev' });

module.exports = defineConfig({
  e2e: {
    chromeWebSecurity: false,
    // baseUrl: process.env.DASHBOARD_URL,
    env: {
      EMAIL: process.env.EMAIL,
      PASSWORD: process.env.PASSWORD
    },
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.name === 'chrome' || browser.family === 'chromium') {
          launchOptions.args.push('--incognito')
        }
        return launchOptions
      }),
      config.env = {
        ...config.env,
        DASHBOARD_URL: process.env.DASHBOARD_URL
      }
      return config;
      // implement node event listeners here
    },
  },
});
