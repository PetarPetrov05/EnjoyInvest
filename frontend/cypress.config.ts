import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: 'je4y94',
  e2e: {
    setupNodeEvents(on, config) {
      return config;
    },
  },
})