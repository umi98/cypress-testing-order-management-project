# 🧪 Cypress Testing Project

This project is an automated testing setup built using **Cypress**, a powerful end-to-end testing framework for web applications.  
It includes tests for various user flows, configuration settings, and reusable commands to ensure maintainable and scalable test coverage.



## 📁 Project Overview

This repository contains Cypress test cases designed to validate core features of the target web application.  
The structure follows best practices for organizing Cypress tests, including fixtures for test data, custom commands, and configuration files.

**Main Features:**
- End-to-end testing using Cypress.  
- Reusable login data and constants for consistent test behavior.  
- Modularized custom commands for better code reuse.  
- Centralized configuration for easy maintenance.


## 🗂️ Folder Structure
```
cypress/
├── e2e/ # Contains end-to-end test cases
├── fixtures/ # Holds test data files (e.g., login credentials)
├── support/
│ ├── commands.js # Custom Cypress commands
│ ├── constant.js # Project constants
│ └── e2e.js # Support file automatically loaded before tests
└── cypress.config.js # Cypress configuration file
```


## ⚙️ Setup Instructions

1. **Install dependencies**
    ```bash
    pnpm install
    ```
2. **Get the environment configuration**
Contact the project owner to obtain the required .env files before running the tests.

3. **Run Cypress**

    Interactive mode:
    ```bash
        pnpm cypress open
    ```

    Headless mode:
    ```bash
        pnpm cypress run
    ```
## 🧩 Dependencies

* Node.js (v16 or later recommended)
* pnpm, npm, or yarn
* Cypress

## 📝 Edit Log
|Date|Type|Description|
|----|-----|---------------|
|2025-11-11|Add|Added all files in e2e folder, fixtures/loginData.json, support/constant.js|
|2025-11-12|Edit|Updated support/commands.js and cypress.config.js|
|2025-11-12|Add|Add files on Product Menu Folder|
|2025-11-12|Add|Add test for Product Menu|
|2025-11-13|Add|Add test for Daftar Produk page|
|2025-11-13|Edit|Edit e2e/ProductMenu/ProductList.cy.js to add checking table headers|
|2025-11-13|Edit|Edit e2e/ProductMenu/ProductList.cy.js to add checking action buttons|
|2025-11-14|Edit|Edit e2e/ProductMenu/ProductList.cy.js and ProductMenu.cy.js to remove comments|
|2025-11-14|Add|Add test for add product (without variation) as draft and active|
|2025-11-14|Add|Add fixtures/productData.json|
|2025-11-17|Add|Add test to validate if product with same name and SKU exist|
|2025-11-19|Edit|Edit AddProduct.cy.js and related file due to change on UI|

## 📚 Notes
* Use fixtures/loginData.json to store test credentials or reusable mock data.
* The constants in support/constant.js help maintain test consistency.
* Always run tests in a clean environment for reliable results.
* Environment variables required for test execution are stored in .env files (contact the project owner to access them).
* For latest update check on original repository [here](https://github.com/umi98/cypress-testing-order-management-project)