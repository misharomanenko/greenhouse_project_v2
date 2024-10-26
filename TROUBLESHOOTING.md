# Troubleshooting Guide

This exhaustive guide provides comprehensive solutions to common problems you might encounter while setting up or running the KP Sponsor Website. We strive for excellence in addressing all possible issues to ensure a seamless experience.

## Table of Contents

- [Troubleshooting Guide](#troubleshooting-guide)
  - [Table of Contents](#table-of-contents)
  - [Installation Issues](#installation-issues)
    - [pnpm Installation](#pnpm-installation)
    - [API Connectivity](#api-connectivity)
    - [Global Styles](#global-styles)
    - [Responsive Design](#responsive-design)
  - [Navigation and Routing](#navigation-and-routing)
  - [Linting and Formatting](#linting-and-formatting)
  - [TypeScript and JavaScript Integration](#typescript-and-javascript-integration)
  - [Performance Optimization](#performance-optimization)

## Installation Issues

Ensure you're using Node.js 20 by running `node --version`. If not, download the correct version from the official Node.js website.

### pnpm Installation

If `pnpm install` (or virtually anything else) fails, consider these steps:

- Confirm you're using the compatible version of pnpm with Next.js 14.0.4 by checking `pnpm --version`.
- Clear the pnpm cache with `pnpm store prune`.
- Delete `node_modules` and `pnpm-lock.yaml`, then run `pnpm install` again.
- Clear the Jest cache

Or, use the following one-liner:

```sh
pnpm store prune && rm -rf node_modules pnpm-lock.yaml && pnpm install && jest --clearCache
```

Make sure to use `pnpm install` to install dependencies. If errors persist, try clearing the cache with `pnpm store prune` before reinstalling dependencies.

### API Connectivity

For API connectivity issues:

- Review the `.env` file for correct backend URLs.
- Ensure backend services are running.
- Use the axios library (included in dependencies) for HTTP requests and handle API errors gracefully.

### Global Styles

If global styles aren't applied:

- Confirm global CSS imports are correctly placed in `_app.js`.
- Check for CSS module conflicts.
- Styles in `globals.css` will apply to the entire site. Any recurring issues are likely found in here.
- Ensure that Tailwind CSS is properly configured in tailwind.config.ts.

### Responsive Design

For responsive design issues:

- Verify Tailwind CSS breakpoints in `tailwind.config.ts`.
- Ensure media queries are correctly used in component styles.

## Navigation and Routing

For navigation issues:

- Ensure `nav.tsx` is correctly linked to pages.
- Review `next.config.js` for custom routing configurations that may affect navigation.

## Linting and Formatting

Before pushing code, ensure to address linting and formatting:

- Identify linting issues with `pnpm lint`. This should be your first step to catch any potential syntax or style issues.
- Automatically fix linting errors with `pnpm lint:fix`. This command will attempt to automatically resolve any identified linting issues.
- Format the codebase with Prettier using `pnpm format`. This ensures that your code adheres to the project's style guide.

Running these commands before pushing code helps maintain the codebase's quality and readability.

## TypeScript and JavaScript Integration

For TypeScript issues:

- Verify correct compiler options in `tsconfig.json`.
- Ensure proper referencing and importing of TypeScript and JavaScript files.

## Performance Optimization

For better performance:

- Utilize the `million` library for virtual DOM diffing and updates.
- Check `next.config.js` for custom Webpack configurations that may affect performance.

Remember to commit your changes to the `TROUBLESHOOTING.md` file after making necessary updates. We aim for perfection in resolving all issues and ensuring the website's excellence.
