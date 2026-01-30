# 📝 Notepad

![Vercel Deploy](https://deploy-badge.vercel.app/vercel/notepad-simple)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)

A minimalist, high-performance **Open Source** web-based notepad application built with **Solid JS**, **Vite**, and **Tailwind CSS 4**. Designed for speed, privacy, and ease of use.

🔗 **Live Demo**: [notepad-simple.vercel.app](https://notepad-simple.vercel.app)
💻 **Source Code**: [github.com/shumiq/notepad](https://github.com/shumiq/notepad)

## ✨ Features

- **Open Source**: Free to use, modify, and distribute.
- **Offline-First**: Powered by Service Workers (Vite PWA) for reliable offline access.
- **Persistent Storage**: Uses **Dexie.js** (IndexedDB) to save your notes locally in your browser—no login required.
- **Line Numbering**: Built-in line numbers for better code and text editing experience.
- **Modern UI**: Styled with **Tailwind CSS 4** and **DaisyUI 5** for a sleek, responsive, and customizable interface.
- **Theme Support**: Includes light and dark mode switching (DaisyUI themes).
- **Native File Access**: Uses the **File System Access API** to open and save files directly from/to your device.
- **PWA Ready**: Installable on mobile and desktop as a standalone application.
- **Text Operations**: Quick toolbar buttons for Select All, Clear, Copy, and Paste operations.
- **AI-Powered**: Integrated AI assistant to help refine, rewrite, or generate text directly within the editor.

## ⌨️ Keyboard Shortcuts

| Shortcut       | Action        |
| -------------- | ------------- |
| `Ctrl+S`       | Download Note |
| `Ctrl+O`       | Open File     |
| `Ctrl+Shift+X` | Clear All     |
| `Ctrl+Shift+C` | Copy All      |
| `Ctrl+Shift+V` | Paste All     |

## 🚀 Tech Stack

- **Framework**: [Solid JS](https://solidjs.com)
- **Bundler**: [Vite](https://vitejs.dev)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com), [DaisyUI 5](https://daisyui.com)
- **Database**: [Dexie.js](https://dexie.org)
- **PWA**: [vite-plugin-pwa](https://vite-pwa-org.netlify.app)
- **AI**: [OpenRouter](https://openrouter.ai) API
- **Language**: TypeScript

## 🛠️ Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/shumiq/notepad.git

# Install dependencies
bun install
```

### Development

```bash
# Start development server
bun dev
```

### Build

```bash
# Build for production
bun build:solid
```

## 📜 Scripts

| Script          | Description                                                    |
| --------------- | -------------------------------------------------------------- |
| `dev`           | Runs the app in development mode at `localhost:3000`.          |
| `dev:vercel`    | Runs the app with Vercel CLI (required for API/serverless).    |
| `build:solid`   | Compiles TypeScript and builds the production bundle via Vite. |
| `deploy:vercel` | Deploys the production build to Vercel.                        |
| `env:pull`      | Pulls environment variables from Vercel project.               |
| `typecheck`     | Runs TypeScript type checking.                                 |
| `preview`       | Previews the production build locally.                         |
| `lint`          | Runs ESLint.                                                   |
| `format`        | Formats code using Prettier.                                   |
| `prepare`       | Sets up Husky for git hooks.                                   |

## 🔑 Environment Variables

To use the AI features, you must configure the following environment variables.

1. Copy the example environment file (if available) or create a `.env.local` file in the root directory:

```bash
touch .env.local
```

2. Add the following keys:

```env
# OpenRouter API Key for AI features
OPENROUTER_API_KEY=your_api_key_here

# Recommended Model (e.g., google/gemini-2.0-flash-exp:free)
OPENROUTER_MODEL=google/gemini-2.0-flash-exp:free
```

## 🌐 Deployment

This project is configured for deployment on **Vercel**.

```bash
bun deploy:vercel
```

## 🤖 AI Assistance

This project was developed with the assistance of AI agents. The source code is partially generated and refined using AI tools to improve efficiency and maintain high-quality code standards.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
