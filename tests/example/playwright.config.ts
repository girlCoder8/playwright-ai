import { PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
  reporter: [
    ['list'],
    ['allure-playwright'],
  ],
  timeout: 60000,
  retries: 0,
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    // viewport: { width: 1920, height: 1080 }, 
    actionTimeout: 15000,
    ignoreHTTPSErrors: true,
    // baseURL: 'http://zero.webappsecurity.com/bank/transfer-funds.html', 
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'Chromium',
      use: { browserName: 'chromium' },
    },

    {
      name: 'Firefox',
      use: { browserName: 'firefox' },
    },

    {
      name: 'Webkit',
      use: { browserName: 'webkit' },
    },
  ],
}

export default config
