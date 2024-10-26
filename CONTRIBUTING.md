# KP Sponsor Website Contribution Guide

Welcome to the KP Sponsor Website contribution guide. This document outlines the best practices and procedures for contributing to the codebase.

## Table of Contents

- [KP Sponsor Website Contribution Guide](#kp-sponsor-website-contribution-guide)
  - [Table of Contents](#table-of-contents)
  - [Engineering Practices](#engineering-practices)
    - [Code Quality](#code-quality)
    - [Workflow](#workflow)
  - [Code Organization](#code-organization)
    - [Repository Structure Review](#repository-structure-review)
  - [User Interface and Layout](#user-interface-and-layout)
  - [Project Management](#project-management)

## Engineering Practices

### Code Quality

- Maintain a clean and modular codebase by following the existing directory structure and naming conventions.
- Place new files in the appropriate subdirectories as outlined in app/README.md.
- Ensure components are modular and reusable.
- Add README files for large folders to explain their structure and contents. Use docstrings for smaller folders to provide clarity.
- Use ESLint and Prettier for code linting and formatting. Refer to .eslintrc.json and .prettierrc for configuration details.
- Set up pre-commit hooks to ensure code quality before commits.
- Implement a testing suite to cover critical functionalities.

### Workflow

- Create a feature branch for every new feature or bug fix.
- Submit Pull Requests (PRs) for code review. Each PR must be reviewed by the ticket holder and at least one other person.
- Ensure CI/CD checks pass with a green checkmark before merging to the main branch.

## Code Organization

### Repository Structure Review

- Create READMEs for large folders to explain their structure and contents.
- Add docstrings for smaller folders for clarity.
- Review and document API endpoints to ensure they are up-to-date and clearly defined.
- Set up Continuous Integration and Continuous Deployment (CI/CD) to automate the build and deployment process.

## User Interface and Layout

- Strive for excellence in UI design. The user interface should be intuitive, responsive, and visually appealing.
- Confirm proper usage of Material-UI components following `@mui/material` documentation. This ensures a consistent and professional look and feel across the application.
- Ensure consistent theme application across components. This includes color schemes, typography, and layout.
- Regularly review and update the UI based on user feedback and usability testing. This ensures the interface remains user-friendly and meets the needs of the users.
- Consider accessibility in the design. The application should be usable by everyone, including those with disabilities.
- Use responsive design principles to ensure the application looks good on all devices, from mobile phones to desktop computers.

## Project Management

- Integrate GitHub with Slack for Pull Request notifications and ensure timely reviews.
- Tag individuals in Slack for action items that require attention.
- Use Linear to track tickets and manage the project workflow effectively.
- Use GitHub issues for tracking bugs and feature requests. Ensure to provide a comprehensive description and steps to reproduce for bug reports.

Remember to adhere to the coding standards and practices outlined in this guide to maintain the quality and consistency of the codebase. Happy coding!
