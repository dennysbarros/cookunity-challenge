# CookUnity QA Automation Challenge

This repository contains automated tests for the CookUnity QA Automation Challenge, implementing both frontend E2E tests and backend API tests using Cypress.

## 🏗️ Project Structure

```
cookunity-challenge/
├── tests/
│   ├── api/                    # Backend API tests
│   │   └── goRestApi.cy.js     # GoRest API CRUD tests
│   ├── e2e/                    # Frontend E2E tests
│   │   ├── orderNow/           # Order flow tests
│   │   │   ├── orderNow.cy.js
│   │   │   └── orderNowSelectors.js
│   │   ├── login/              # Login/Signup tests
│   │   │   └── loginSelectors.js
│   │   └── mealSelect/         # Meal selection tests
│   │       └── mealSelectSelectors.js
│   ├── fixtures/               # Test data
│   │   ├── goRestApi.json      # API endpoints and tokens
│   │   └── users.json          # User test data
│   └── support/                # Cypress support files
│       ├── commands.js         # Custom Cypress commands
│       ├── e2e.js             # E2E configuration
│       └── utils.js            # Utility functions
├── cypress.config.js           # Cypress configuration
├── package.json                # Dependencies and scripts
└── README.md                   # This file
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
npm run test:report
```

### Open HTML Report
```bash
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
   - First Name: My Name
   - Last Name: My Lastname
   - Password: 123123123

**Assertions:**
- URL must contain "en/meal-select"
- Verify more than one meal is displayed in the meals list

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

## 🛠️ Configuration

### Cypress Configuration
- **Base URL:** https://www.cookunity.com
- **Default Timeout:** 10 seconds
- **Retries:** 2 attempts for both run and open modes
- **Screenshots:** Enabled on failure
- **Reporter:** Mochawesome for HTML reports

### Test Data
- **User Data:** `tests/fixtures/users.json`
- **API Configuration:** `tests/fixtures/goRestApi.json`

## 📊 Reports

The project uses Mochawesome for generating HTML test reports:

- **JSON Reports:** Generated in `mochawesome-report/`
- **HTML Report:** Generated as `mochawesome-report/index.html`
- **Merged Report:** Combines all test results

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
- `checkElementVisibility`: Custom command for element visibility with retry logic
- Utility functions for common operations (e.g., email generation)

### Error Handling
- Retry logic for flaky elements
- Screenshots on test failure
- Comprehensive error logging

## 🔧 Available Scripts

```json
{
  "test": "cypress run",
  "merge:report": "npx mochawesome-merge mochawesome-report/*.json > mochawesome-report/merged.json",
  "generate:html": "npx marge mochawesome-report/merged.json --reportDir mochawesome-report --reportFilename index.html",
  "test:report": "npm run test && npm run merge:report && npm run generate:html",
  "open:report": "open mochawesome-report/index.html"
}
```

## 📝 Considerations

- **Browser Compatibility:** Tests run on Chrome by default
- **Network Stability:** Tests include retry logic for network issues
- **Data Cleanup:** Tests use unique email generation to avoid conflicts
- **Environment:** Configured for production environment (www.cookunity.com)

## 🤝 Contributing

1. Follow the existing code structure and naming conventions
2. Use camelCase for file and folder names
3. Organize selectors in appropriate files
4. Add proper test descriptions and assertions
5. Update this README if adding new features

## 📚 References

- [Cypress Documentation](https://docs.cypress.io/)
- [Mochawesome Reporter](https://github.com/adamgruber/mochawesome)
- [GoRest API Documentation](https://gorest.co.in/)