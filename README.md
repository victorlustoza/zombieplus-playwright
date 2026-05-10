![poster](https://raw.githubusercontent.com/qaxperience/thumbnails/main/playwright-zombie.png)

## 🤘 About

Repository for the automated testing project of the Zombie Plus system, built in the Playwright Zombie Edition course! Playwright is an open-source tool developed by Microsoft that revolutionizes web system test automation, offering an effective and highly reliable approach.

## 💻 Technologies
- Node.js
- Playwright
- JavaScript
- Faker
- PostgreSQL

## 🏗️ Architecture

The project follows a monorepo structure with three distinct components:

**API Layer** (`apps/zombieplus/api/`)
- Node.js/Express framework with production-ready middleware stack
- Sequelize ORM for PostgreSQL database abstraction
- JWT-based authentication with bcryptjs password hashing
- Security hardened with Helmet, CORS, and rate limiting (express-brute)
- Comprehensive error handling via Youch and Sentry integration
- Production code obfuscation using javascript-obfuscator
- File upload support through Multer middleware

**Web Layer** (`apps/zombieplus/web/`)
- React single-page application built with Webpack
- Static asset deployment served through Node.js
- Responsive design with custom CSS and Google Fonts
- PWA support with service worker and manifest files

**Database Layer**
- PostgreSQL with Docker containerization
- Docker Compose orchestration including pgAdmin for management
- Five core data models: User, Movie, TvShow, Company, Lead
- Data validation through Sequelize model constraints

## 🧪 Testing Framework & Setup

**Playwright Configuration**
- Version 1.59.1 with latest Playwright best practices
- Single-browser testing (Chromium) optimized for CI/CD pipelines
- HTML reporter for detailed test execution analytics
- Trace capture on first retry for failure debugging
- Base URL configuration for seamless environment switching
- Parallel test execution enabled with CI-specific worker configuration

**Test Organization**
- **E2E Tests** (3 specification files, 14 total tests)
  - `login.spec.js` - 6 tests covering authentication flows
  - `leads.spec.js` - 7 tests for waitlist signup functionality
  - `movies.spec.js` - 1 test demonstrating admin movie registration

- **Page Object Model Pattern**
  - LoginPage - Admin authentication interactions
  - LandingPage - Public-facing lead capture
  - MoviesPage - Admin content management
  - Toast Component - Reusable notification assertions

- **Support Infrastructure**
  - Custom Playwright fixture registration for dependency injection
  - PostgreSQL direct connectivity utility for test data setup/teardown
  - Structured test data fixtures (movies.json with 6+ movie entries)
  - Faker.js integration for dynamic test data generation

## 🤖 How to Run

1. Clone the repository, install dependencies
```
npm install
```

2. Run tests in Headless mode
```
npx playwright test
```

3. View the test report
```
npx playwright show-report
```

## 🏆 Best Practices & Patterns Implemented

**Test Design**
- Comprehensive coverage including positive paths and negative scenarios
- Edge case validation (empty fields, invalid formats, duplicates)
- Clear test naming conventions reflecting business domain
- Single responsibility principle per test case

**Code Organization**
- Page Object Model abstraction for UI element interaction
- Fixture-based dependency injection for cleaner test code
- Separation of concerns: pages (UI), support (utilities), specs (scenarios)
- Reusable component assertions (Toast validation logic)

**Data Management**
- Faker.js for generating realistic, non-deterministic test data
- Fixture files for static reference data (movies.json)
- Direct SQL execution for precise test data setup/cleanup
- Database state isolation preventing test interdependencies

**Developer Experience**
- Multiple execution modes: headless, headed, UI mode, debug mode
- HTML report generation with trace viewing for failed tests
- Prettier code formatting enforcement
- Docker-based infrastructure for reproducible local development
- Hot-reload support in API via Nodemon

**Security & Reliability**
- Code obfuscation in production API builds
- Rate limiting middleware preventing brute-force attacks
- JWT token-based stateless authentication
- bcryptjs for cryptographic password hashing
- Sentry integration for production error monitoring
- Helmet security headers enforcement

## 📚 Lessons Learned

1. **Comprehensive Validation Testing**: Rather than simple positive tests, each form includes extensive negative test cases covering format validation, required fields, and business rule violations.

2. **End-to-End User Journeys**: Tests model complete user workflows (authentication → action → success confirmation) rather than isolated unit-level assertions.

3. **Test Data Strategy**: Combines three approaches—dynamic generation (Faker), static fixtures (JSON), and direct DB manipulation—providing flexibility across different test scenarios.

4. **Security by Default**: Production code includes obfuscation, rate limiting, proper secret management, and monitoring, demonstrating enterprise security practices.

5. **Developer-First Infrastructure**: Docker Compose setup eliminates environment setup friction, while debug modes and trace capture support rapid issue resolution.

6. **Fixture Pattern for Clean Tests**: Playwright's fixture extension mechanism creates dependency injection, reducing boilerplate and improving test readability compared to traditional beforeEach hooks.

7. **Parallel Execution with Headless Mode**: Configuration balances local developer experience (parallel runs, headed mode support) with CI/CD requirements (single worker, CI-only retries).
