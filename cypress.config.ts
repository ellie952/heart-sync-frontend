import { defineConfig } from "cypress";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  e2e: {
    env: {
      FRONTEND_BASE_URL: process.env.VITE_FRONTEND_BASE_URL
    },
    // setupNodeEvents(on, config) {
    //   // implement node event listeners here
    // },
  },
});
