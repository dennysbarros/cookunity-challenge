# CookUnity QA Automation Challenge

This repository contains automated tests for the CookUnity QA Automation Challenge, implementing both frontend E2E tests and backend API tests using Cypress.

## 🏗️ Project Structure

```
cookunity-challenge/
├── tests/
│   ├── api/                    → API tests (GoRest)
│   ├── e2e/                    → E2E tests for Order Now flow and selectors
│   ├── fixtures/               → Test data (users, API config)
│   └── support/                → Commands, utils
├── cypress.config.js
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd cookunity-challenge

# Install dependencies
npm install
```

## 🧪 Running Tests

### Run All Tests
```bash
npm test
```

### Run Tests with HTML Report
```bash
npm run test
npm run open:report
```

### Run Specific Test Types
```bash
# Run only API tests
npx cypress run --spec "tests/api/**/*.cy.js"

# Run only E2E tests
npx cypress run --spec "tests/e2e/**/*.cy.js"

# Open Cypress Test Runner
npx cypress open
```

## 📋 Test Scenarios

### Frontend E2E Test - Order Now Flow
**File:** `tests/e2e/orderNow/orderNow.cy.js`

**Test Steps:**
1. Navigate to www.cookunity.com
2. Enter zip code: 10001 and continue
3. Skip preference quiz by clicking "Skip All"
4. Select 6 meals plan and continue
5. Complete account creation with test data:
   - Email: qa.mail@gmail.com (generated with timestamp)
   - Password: 123123123

**Assertions:**
- URL must contain "en/meal-select"
- Verify more than one meal is displayed in the meals list

**Issues & Decisions:**

Some limitations came up during implementation that required specific workarounds or conscious choices:

- The challenge suggests using `qa.mail@gmail.com`, but this email is already taken in CookUnity’s system, causing the signup test to fail after the first run.
- To solve this, I added timestamp-based email generation to keep the same format but ensure uniqueness.

### Backend API Tests - GoRest API
**File:** `tests/api/goRestApi.cy.js`

#### Test 1: Get Active User Details
1. GET https://gorest.co.in/public/v1/users
2. Filter active users and get first user details
3. GET https://gorest.co.in/public/v1/users/{userId}
4. Assert: status "active" and status code 200

#### Test 2: Update User Name
1. GET https://gorest.co.in/public/v1/users
2. Update first user name via PATCH request
3. PATCH https://gorest.co.in/public/v1/users/{userId}
4. Assert: name updated and status code 200

**Issues & Decisions:**

- The GoRest API PATCH test uses email "jana.waters@hotmail.us" as specified in requirements, but this email already exists in the API database, causing the test to fail on subsequent runs. Also, the API has a default limit of 10 users per page. 
- In this case, I decided to follow the exact challenge requirements without implementing pagination or email generation, as these were not specified in the test requirements. 

## 🛠️ Cypress Configuration

- **Base URL:** https://www.cookunity.com
- **Default Timeout:** 10 seconds
- **Screenshots:** Enabled on failure
- **Reporter:** Mochawesome for HTML reports

## 📊 Reports

The project uses Mochawesome for generating HTML test reports:

- **JSON Reports:** Generated in `test-reports/`
- **Merged Report:** Combines all test results in `merged_report.html`

## 🏛️ Architecture & Best Practices

### Page Object Model
- Selectors are organized in separate files by functionality
- Each page/component has its own selectors file
- Promotes maintainability and reusability

### Test Data Management
- Fixtures for API endpoints and user data
- Centralized test data management
- Easy to update test data without changing test logic

### Custom Commands
- `checkElementVisibility`: Custom command for element visibility with retry logic (I decided not to use it, but I let it in the code)
- Utility functions for common operations (e.g., email generation)

### Error Handling
- Retry logic for flaky elements
- Comprehensive error logging

## 📚 References

- [Cypress Documentation](https://docs.cypress.io/)
- [Mochawesome Reporter](https://github.com/adamgruber/mochawesome)
- [GoRest API Documentation](https://gorest.co.in/)
