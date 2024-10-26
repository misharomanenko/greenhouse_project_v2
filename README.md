<div align="center">

# [KP Frontend](https://kp-fellows.vercel.app/)

**Rethinking the science of prediction**

</div>

## Table of Contents

- [KP Frontend](#kp-frontend)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development](#development)
  - [Code Formatting, Linting and Testing](#code-formatting-linting-and-testing)
  - [Debugging](#debugging)
  - [Setting up Husky](#setting-up-husky)
  - [Project Structure](#project-structure)
  - [Backend Variables](#backend-variables)
  - [Technology Stack](#technology-stack)
  - [Environment Variables](#environment-variables)
  - [Troubleshooting](#troubleshooting)

## Introduction

Welcome to the KP Sponsor Website. This guide will help you get a local copy of the project up and running for development and testing purposes.

## Prerequisites

Before you begin, ensure you have the following software installed on your machine:

- [Node.js](https://nodejs.org/) - A JavaScript runtime built on Chrome's V8 JavaScript engine.
- [pnpm](https://pnpm.io/) - A fast, disk space efficient package manager.

## Installation

Follow these steps to get a local copy of the project:

1. Clone the repository

## Development

To set up your local development environment, follow these steps:

1. Install the project dependencies:

```sh
pnpm install
```

2. Start the development server:

```sh
pnpm dev
```

This command will start the KP Sponsor Website in development mode, making it accessible on your local machine for testing and development purposes.

## Code Formatting, Linting and Testing

To ensure code quality and consistency, run the following commands:

- Format code with Prettier:

```sh
pnpm format
```

This command will format the code in the KP Sponsor Website project using the predefined code style rules.

- Fix linting issues:

```sh
pnpm lint:fix
```

This command will automatically fix any linting issues in the KP Sponsor Website project, if possible. If some linting issues cannot be automatically fixed, they will be reported in the console.

- Run unit tests:

```sh
pnpm test           # Just execute all available suites of tests to see what fails/passes
pnpm test:watch     # Interactive test mode, allows test re-running and more insights
pnpm test:coverage  # Execute all available test suites, and get a representation of the current total % code coverage with unit tests
```

Run unit tests in `tests/`, based on the specified configuration. For more information on developing unit tests and the current Jest configuration continue reading below.

For more information on code coverage, after running `pnpm test:coverage` launch the report generated at `coverage/lcov-report/index.html` in the browser of your choice.

## Debugging

If you run into any errors with package dependencies and/or the testing suite imports/types, please run the following command to clean up your environment prior to re-running any scripts:

```sh
pnpm store prune && rm -rf node_modules pnpm-lock.yaml && pnpm install && jest --clearCache
```

## Setting up Husky

To ensure code quality and consistency, we use Husky to run pre-commit hooks. Follow these steps to set up Husky:

1. Make sure you have installed the project dependencies:

```sh
pnpm dlx husky-init && pnpm install
```

## Project Structure

The KP Sponsor Website project is meticulously organized into several key directories, each serving a specific role. Understanding this structure will help you navigate the codebase more efficiently.

```sh
styles/                  # Directory for global styles
├── globals.css          # Global CSS styles
```

The `styles/` directory houses the global CSS styles for the project, ensuring a consistent look and feel across the entire website. The `globals.css` file contains these global styles.

```sh
public/                  # Publicly accessible files
├── assets/              # Static assets like images
├── kp.tsx               # KP Icon
├── favicon.ico          # Website favicon
├── icon.png             # Website icon
```

The `public/` directory contains files that are publicly accessible. This includes static assets like images (`assets/`), web fonts (`fonts/`), and the website's favicon and icon. The `kp.tsx` file contains the KP Icon.

```sh
config/
├── config/.eslintignore   # Ignore file for ESLint
├── config/.prettierrc     # Ignore file for Prettier
├── config/eslintrc.json   # Config file for ESLint
├── config/jest.setup.js   # Setup script for Jest
```

The `config/` directory contains some of the configuration and setup scripts that kept away from the root of the repository for ease of readibility.

```sh
tests
├── tests/Login.test.tsx   # Sample test suite, contains individual unit tests and fixtures within
├── tests/utils            # Directory for any and all utils (temporary files, or function definitions if they are re-used throughout the test framework)
```

```sh
app/                     # Main application directory
├── api/                 # API related files
├── components/          # Reusable React components
├── hooks/               # Custom React hooks
```

The `app/` directory is the heart of the application. It contains several subdirectories:

- `api/`: This directory contains all API related files, facilitating communication with the backend services.
- `components/`: This directory houses reusable React components, promoting code reusability and consistency across the application.
- `hooks/`: This directory contains custom React hooks, encapsulating and reusing stateful logic across the application.

## Backend Variables

The backend of the application is configured through the `NEXT_PUBLIC_BACKEND_URL` environment variable. This variable is set to different values depending on the environment in which the application is running.

In a production environment, `NEXT_PUBLIC_BACKEND_URL` is set to `https://sponsor-website-backend.vercel.app`. This is the production backend environment hosted on AWS, which contains all user data. It is important to note that this production backend should only be used in conjunction with the production Vercel site.

For preview or development environments, the production backend should not be used to prevent any accidental manipulation of real user data. Instead, a separate preview backend URL should be set for the `NEXT_PUBLIC_BACKEND_URL`. This preview backend contains an initialization script to create a test user with mock data, allowing for safe testing and development.

## Technology Stack

- React.js
- Next.js
- Tailwind CSS
- Node.js

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

```sh
# Stytch Configuration
STYTCH_SECRET=''
STYTCH_M2M_SPONSOR_FE_CLIENT_SECRET=''
STYTCH_PUBLIC_TOKEN=''
STYTCH_M2M_SPONSOR_FE_CLIENT_ID=''
STYTCH_PROJECT_ENV=''
STYTCH_PROJECT_ID=''
STYTCH_INVITE_EMAIL_TEMPLATE_ID=''
STYTCH_RESET_EMAIL_TEMPLATE_ID=''

# Vercel Configuration
NEXT_PUBLIC_VERCEL_ENV=''

# Backend Configuration
NEXT_PUBLIC_BACKEND_URL=''
```

## Troubleshooting

If you encounter any issues, please refer to the [Troubleshooting Guide](TROUBLESHOOTING.md).
