import fs from 'node:fs';

import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';

// ---------------------------------------------------------------------------
// Luật kiến trúc theo bulletproof-react: shared -> features -> app (một chiều)
// và các feature không được import lẫn nhau.
// ---------------------------------------------------------------------------
const SHARED = ['components', 'config', 'hooks', 'lib', 'stores', 'utils'];
const features = fs.existsSync('src/features')
  ? fs
      .readdirSync('src/features', { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name)
  : [];

// Bắt buộc dùng alias @/ khi đi ra ngoài thư mục hiện tại quá 1 cấp
const noDeepRelative = {
  group: ['../../*', '../../**'],
  message: 'Dùng import tuyệt đối "@/..." thay vì đường dẫn tương đối nhiều cấp.',
};

const restrict = (patterns) => ({
  'no-restricted-imports': ['error', { patterns: [...patterns, noDeepRelative] }],
});

export default defineConfig([
  globalIgnores(['dist', 'coverage', 'node_modules', '.ai']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]', argsIgnorePattern: '^_' }],
    },
  },
  // lib/ và router chứa hook + component dùng chung, không cần fast refresh
  {
    files: ['src/lib/**', 'src/app/router.jsx'],
    rules: { 'react-refresh/only-export-components': 'off' },
  },
  {
    files: ['*.config.js'],
    languageOptions: { globals: globals.node },
  },
  {
    files: ['**/*.test.{js,jsx}', 'src/testing/**'],
    languageOptions: { globals: { ...globals.node, ...globals.vitest } },
    rules: { 'react-refresh/only-export-components': 'off' },
  },
  // Shared: không được import features / app
  {
    files: SHARED.map((s) => `src/${s}/**`),
    rules: restrict([
      {
        group: ['@/features', '@/features/*', '@/features/**', '@/app', '@/app/*', '@/app/**'],
        message: 'Thư mục dùng chung không được import từ features/ hoặc app/.',
      },
    ]),
  },
  // Mỗi feature: không import app, không import feature khác
  ...features.map((name) => ({
    files: [`src/features/${name}/**`],
    rules: restrict([
      {
        group: ['@/app', '@/app/*', '@/app/**'],
        message: 'Feature không được import từ app/. Ghép các feature ở tầng app.',
      },
      {
        group: ['@/features/*', '@/features/**', `!@/features/${name}`, `!@/features/${name}/**`],
        message: 'Feature không được import từ feature khác. Ghép chúng ở tầng app.',
      },
    ]),
  })),
  // app: được import mọi thứ, chỉ cấm tương đối nhiều cấp
  {
    files: ['src/app/**'],
    rules: restrict([]),
  },
]);
