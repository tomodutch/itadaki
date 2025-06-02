import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig, mergeConfig } from 'vitest/config';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));


export default mergeConfig(
  defineConfig({
    plugins: [tsconfigPaths(), react()],
    test: {
      name: 'unit',
      environment: 'jsdom',
    },
  }),
  defineConfig({
    plugins: [
      storybookTest({
        // The location of your Storybook config, main.js|ts
        configDir: path.join(dirname, '.storybook'),
        // This should match your package.json script to run Storybook
        // The --ci flag will skip prompts and not open a browser
        storybookScript: 'npm storybook --ci',
      }),
    ],
    test: {
      name: 'storybook',
      // Enable browser mode
      browser: {
        enabled: true,
        // Make sure to install Playwright
        provider: 'playwright',
        headless: true,
        instances: [{ browser: 'chromium' }],
      },
      setupFiles: ['./.storybook/vitest.setup.ts'],
    },
  }),
);

// export default defineConfig({
//   plugins: [tsconfigPaths(), react()],
//   test: {
//     environment: 'jsdom',
//   },
// })

