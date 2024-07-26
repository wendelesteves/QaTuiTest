# QaTuiTest UI Automation
QA Test for TUI

[![Cypress.io](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg)](https://www.cypress.io/)

## Contents

-   Local Setup
    -   [Installation](#installation)
    -   [Run tests locally](#run-tests-locally)
        -   [Cypress GUI Headed](#cypress-gui-headed)
        -   [NPM Scripts Headless](#npm-scripts-headless)

## Local Setup

### Prerequisites

- Have node.js installed.

    If not, install via https://nodejs.org/en/download, and select your OS version. On the installer, just click "Next" until "Finish". Verify the node is installed using the command "node -v" on a terminal.

### Installation

```
npm install
```

### Run tests locally

#### Cypress GUI Headed

Cypress can be executed using its UI, for that, just use the bellow command, a window will open, choose the testing type, next choose the desired browser and click on a spec file to start test execution.

```
npx cypress open
```

<p align="center">
    <img alt="Cypress GUI" src="./docs/img/cypress.ui.png">
</p>

#### NPM Scripts Headless

We also created NPM scripts to easily trigger cypress execution through command line, take a look at [package.json](./package.json) to see all available scripts.

Some exemples:

To execute all spec files:

```
npx cypress run
```

<p align="center">
    <img alt="Cypress GUI" src="./docs/img/cypress.npm.scripts.png">
</p>

To select a browser to run the tests on (e.g.: chrome, firefox, etc):

```
npx cypress run --browser chrome
```

To execute only one spec file, in this case the login.spec:

```
npx cypress run --spec "cypress/e2e/login.spec.cy.js"
```

You can also chain commands, for exemple select the browser and specify a spec file to run:

```
npx cypress run --browser chrome --spec "cypress/e2e/login.spec.cy.js"
```

More information about running cypress can be found at official documentation https://docs.cypress.io/guides/guides/command-line
