import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: 'je4y94',
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      return config;
    },
  },
})