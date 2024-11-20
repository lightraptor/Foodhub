# Food Hub

A modern web application built using React, Redux, Vite, and TypeScript. The project is configured with a strong development environment including ESLint, Prettier, and Husky for code quality, and TailwindCSS for styling.

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Scripts](#scripts)
3. [Dependencies](#dependencies)
4. [Development Environment](#development-environment)
5. [Features](#features)

---

## Getting Started

To get started with the **Food Hub** project, follow these steps:

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd food-hub
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser at `http://localhost:3000` to see the application running.

---

## Scripts

The project provides the following scripts for managing development and builds:

| Command                  | Description                                       |
| ------------------------ | ------------------------------------------------- |
| `npm run dev`            | Starts the development server using Vite.         |
| `npm run build`          | Builds the project using TypeScript and Vite.     |
| `npm run preview`        | Serves the built application for preview.         |
| `npm run lint`           | Lints the codebase using ESLint.                  |
| `npm run check:type`     | Performs TypeScript type checking.                |
| `npm run check:lint`     | Fixes linting issues and outputs results quietly. |
| `npm run check:prettier` | Formats code using Prettier.                      |
| `npm run check:all`      | Runs all checks (Prettier, ESLint, TypeScript).   |
| `npm run prepare`        | Prepares Husky hooks for Git pre-commit checks.   |

---

## Dependencies

### Main Dependencies

- **React**: UI library for building interactive user interfaces.
- **Redux Toolkit**: For state management with a simplified API.
- **React Router**: Handles routing in the application.
- **Axios**: HTTP client for API requests.
- **React Hook Form**: For managing forms efficiently.
- **Yup**: Schema validation for form inputs.
- **React Toastify**: Notifications for user feedback.

### Developer Dependencies

- **TypeScript**: Adds static typing to JavaScript.
- **Vite**: Development server and build tool.
- **TailwindCSS**: Utility-first CSS framework for styling.
- **ESLint**: Enforces code quality and style.
- **Prettier**: Automatic code formatting.
- **Husky**: Enables Git hooks for pre-commit checks.

---

## Development Environment

The project uses a robust toolchain for development:

- **Vite** for fast build and development.
- **ESLint** and **Prettier** to maintain clean and consistent code.
- **Husky** to prevent bad commits by enforcing checks during pre-commit.

### Path Aliases

`vite-tsconfig-paths` is used to set up path aliases for cleaner imports.

---

## Features

- **State Management**: Uses Redux Toolkit for efficient state handling.
- **Form Handling**: Managed by React Hook Form with Yup for validation.
- **Responsive Design**: Styled with TailwindCSS for modern layouts.
- **API Integration**: Axios is used for seamless API communication.
- **Notifications**: Provides instant feedback with React Toastify.
- **Code Quality**: Enforced with ESLint and Prettier.
- **Type Safety**: Built entirely with TypeScript for robust development.

---

## Contribution

We welcome contributions! Please fork the repository, create a branch, and submit a pull request. Ensure that all checks (`npm run check:all`) pass before submitting.

---

## License

This project is private and not currently open for public use. If you have any questions, contact the maintainers.

---

Enjoy developing with **Food Hub**! 🚀
