# AGENTS.md

## Project overview

This workspace is a Vite + React + TypeScript app. The main app entry points are in [src/App.tsx](src/App.tsx) and [src/main.tsx](src/main.tsx), and the build configuration is defined in [package.json](package.json) and [vite.config.ts](vite.config.ts).

## How to access the terminal

Use the VS Code integrated terminal for shell commands while working in this project.

- Open the terminal with Terminal > New Terminal or the keyboard shortcut Ctrl+`.
- If the task is being executed by an AI agent through the coding environment, prefer the terminal tool provided by the editor rather than opening a separate shell manually.
- Keep commands focused on the project root for this workspace.

## Expected commands

Run these from the workspace root:

- `npm install` to install dependencies.
- `npm run dev` to start the Vite development server.
- `npm run build` to run TypeScript checks and produce a production build.
- `npm run preview` to preview the production build locally.

## Working conventions

- Prefer project-root commands over ad hoc paths.
- If a change affects UI or app behavior, validate it with the relevant local build or dev server command.
- Do not assume a different package manager is used; this project is configured for npm as shown in [package.json](package.json).
- Use the editor terminal for debugging, local verification, and quick checks instead of external shells when possible.

## Useful references

- [package.json](package.json)
- [vite.config.ts](vite.config.ts)
- [src/App.tsx](src/App.tsx)
- [src/main.tsx](src/main.tsx)
