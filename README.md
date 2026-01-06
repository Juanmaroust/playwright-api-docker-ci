# Playwright API Testing Project
![CI](https://github.com/Matiaslb14/qa-api-docker-ci/actions/workflows/ci.yml/badge.svg)
A comprehensive Playwright project for API testing with TypeScript, Docker CI support, and best practices.

## Getting Started

### Prerequisites
- Node.js 16+ (LTS recommended)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Verify Playwright is installed:
```bash
npx playwright install
```

## Running Tests

### Basic test execution
```bash
npm test
```

### Run tests with UI mode
```bash
npm run test:ui
```

### Run tests in headed mode (visible browser)
```bash
npm run test:headed
```

### Debug tests
```bash
npm run test:debug
```

### Run only API tests
```bash
npm run test:api
```

### View test report
```bash
npm run report
```

## Linting

This project uses ESLint with TypeScript support to maintain code quality.

### Run linter
```bash
npm run lint
```

### Fix linting issues automatically
```bash
npm run lint:fix
```

### VSCode Integration

The project includes ESLint integration for VSCode:
1. Install the [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) (`dbaeumer.vscode-eslint`)
2. The extension will automatically display linting errors and warnings in the editor
3. Enable "Fix on Save" to automatically fix issues when you save files (already configured in `.vscode/settings.json`)

**Linting Rules:**
- TypeScript strict mode enabled
- No unused variables
- Consistent code style (prefer const, no var)
- Type safety warnings
- Test files have relaxed type checking rules

## Project Structure

```
playwright-api-docker-ci/
├── tests/
│   └── api/
│       ├── users.spec.ts          # Example API tests
│       ├── posts.spec.ts          # Example API tests
│       └── helpers/
│           └── api-client.ts      # Shared API utilities
├── .github/
│   └── workflows/               # CI/CD workflows
├── playwright.config.ts         # Playwright configuration
├── tsconfig.json               # TypeScript configuration
├── package.json               # Project dependencies
└── README.md                  # This file
```

## Configuration

The `playwright.config.ts` file contains:
- Test directory settings
- Base URL for API testing (JSONPlaceholder by default)
- Retry and timeout settings
- Reporter configuration
- Multi-browser project setup

You can override the base URL via environment variable:
```bash
BASE_URL=https://api.example.com npm test
```

## Testing Best Practices

1. **API Client Abstraction**: Use helper functions for common API operations
2. **Test Data Isolation**: Each test should be independent
3. **Assertion Messages**: Use descriptive assertion messages for clarity
4. **Response Validation**: Validate both status codes and response bodies
5. **Error Handling**: Test both success and error scenarios

## Docker Setup

To run tests in Docker:
```bash
docker build -t playwright-api-tests .
docker run playwright-api-tests
```

## CI/CD Integration

The project is ready for GitHub Actions, GitLab CI, or other CI systems. See `.github/workflows/` for example workflows.

## Debugging

Use the `--debug` flag to step through tests:
```bash
npx playwright test --debug
```

## Resources

- [Playwright Documentation](https://playwright.dev)
- [API Testing Guide](https://playwright.dev/docs/api-testing)
- [Best Practices](https://playwright.dev/docs/best-practices)

## License

MIT
