# 📝 Notepad

A minimalist, high-performance web-based notepad application built with **Solid JS**, **Vite**, and **Tailwind CSS 4**. Designed for speed, privacy, and ease of use.

## ✨ Features

- **Offline-First**: Powered by Service Workers (Vite PWA) for reliable offline access.
- **Persistent Storage**: Uses **Dexie.js** (IndexedDB) to save your notes locally in your browser—no login required.
- **Modern UI**: Styled with **Tailwind CSS 4** and **DaisyUI 5** for a sleek, responsive, and customizable interface.
- **Theme Support**: Includes light and dark mode switching (DaisyUI themes).
- **PWA Ready**: Installable on mobile and desktop as a standalone application.

## 🚀 Tech Stack

- **Framework**: [Solid JS](https://solidjs.com)
- **Bundler**: [Vite](https://vitejs.dev)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com), [DaisyUI 5](https://daisyui.com)
- **Database**: [Dexie.js](https://dexie.org)
- **PWA**: [vite-plugin-pwa](https://vite-pwa-org.netlify.app)
- **Language**: TypeScript

## 🛠️ Getting Started

### Installation

```bash
# Clone the repository
git clone <repository-url>

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
| `build:solid`   | Compiles TypeScript and builds the production bundle via Vite. |
| `deploy:vercel` | Deploys the production build to Vercel.                        |
| `typecheck`     | Runs TypeScript type checking.                                 |
| `preview`       | Previews the production build locally.                         |
| `lint`          | Runs ESLint.                                                   |
| `format`        | Formats code using Prettier.                                   |

## 🌐 Deployment

This project is configured for deployment on **Vercel**.

```bash
bun deploy:vercel
```
