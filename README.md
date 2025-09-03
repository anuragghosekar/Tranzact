# Angular ABSA

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.9.

## Prerequisites to Run the Angular ABSA Project

### 1. Install Node.js & npm
Angular requires **Node.js** and **npm (Node Package Manager)**.

#### Check if Node.js is installed:
```sh
node -v
```
If not installed, download and install **Node.js LTS** from [Node.js Official Website](https://nodejs.org/).

#### Check if npm is installed:
```sh
npm -v
```
If not installed, update or install npm:
```sh
npm install -g npm
```

### 2. Install Angular CLI
Angular CLI is required to serve and build the project.

#### Check if Angular CLI is installed:
```sh
ng version
```
If not installed, install it with:
```sh
npm install -g @angular/cli
```

---

## Steps to Set Up and Run the Project

### Step 1: Clone the Repository
```sh
git clone <repository_url>
cd angular-absa
```

### Step 2: Install Dependencies
Run the following command to install all dependencies:
```sh
npm install
```
## Dependencies (Run the following command)
```
npm install @angular/animations@^17.3.0 @angular/cdk@^17.3.10 @angular/common@^17.3.0 @angular/compiler@^17.3.0 @angular/core@^17.3.0 @angular/forms@^17.3.0 @angular/material@^17.3.10 @angular/platform-browser@^17.3.0 @angular/platform-browser-dynamic@^17.3.0 @angular/platform-server@^17.3.0 @angular/router@^17.3.0 @angular/ssr@^17.3.9 @fortawesome/fontawesome-free@^6.7.2 express@^4.18.2 rxjs@~7.8.0 tslib@^2.3.0 zone.js@~0.14.3
```
##OR

## DevDependencies (Run the following command)
```
npm install --save-dev @angular-devkit/build-angular@^17.3.9 @angular/cli@^17.3.9 @angular/compiler-cli@^17.3.0 @types/express@^4.17.17 @types/jasmine@~5.1.0 @types/node@^18.18.0 jasmine-core@~5.1.0 karma@~6.4.0 karma-chrome-launcher@~3.2.0 karma-coverage@~2.2.0 karma-jasmine@~5.1.0 karma-jasmine-html-reporter@~2.1.0 typescript@~5.4.2

```

### Step 3: Verify Installation
Check if all dependencies are installed correctly:
```sh
npm list --depth=0
```

### Step 4: Start the Development Server
Run the following command to start the local server:
```sh
npm start
# or
ng serve
```
Then, open **http://localhost:4200/** in your browser.

### Step 5: Run Server-Side Rendering (Optional)
If you are using **SSR (Server-Side Rendering)**, run:
```sh
npm run serve:ssr:angular-absa
```

---

## Dependencies (Install using the following command)
```sh
npm install @angular/animations@^17.3.0 @angular/cdk@^17.3.10 @angular/common@^17.3.0 @angular/compiler@^17.3.0 @angular/core@^17.3.0 @angular/forms@^17.3.0 @angular/material@^17.3.10 @angular/platform-browser@^17.3.0 @angular/platform-browser-dynamic@^17.3.0 @angular/platform-server@^17.3.0 @angular/router@^17.3.0 @angular/ssr@^17.3.9 @fortawesome/fontawesome-free@^6.7.2 express@^4.18.2 rxjs@~7.8.0 tslib@^2.3.0 zone.js@~0.14.3
```

## DevDependencies (Install using the following command)
```sh
npm install --save-dev @angular-devkit/build-angular@^17.3.9 @angular/cli@^17.3.9 @angular/compiler-cli@^17.3.0 @types/express@^4.17.17 @types/jasmine@~5.1.0 @types/node@^18.18.0 jasmine-core@~5.1.0 karma@~6.4.0 karma-chrome-launcher@~3.2.0 karma-coverage@~2.2.0 karma-jasmine@~5.1.0 karma-jasmine-html-reporter@~2.1.0 typescript@~5.4.2
```

---

## Credentials for login on UI
```
 Id: admin
 Password: admin123

```
---

## Additional Commands

### Code Scaffolding
Run the following command to generate a new component:
```sh
ng generate component component-name
```
You can also use:
```sh
ng generate directive|pipe|service|class|guard|interface|enum|module
```

### Build the Project
Run the following command to build the project:
```sh
ng build
```
The build artifacts will be stored in the `dist/` directory.

### Running Unit Tests
Run the following command to execute unit tests via [Karma](https://karma-runner.github.io):
```sh
ng test
```

### Running End-to-End Tests
Run the following command to execute end-to-end tests:
```sh
ng e2e
```
To use this command, you need to first add a package that implements end-to-end testing capabilities.

---

## Further Help
To get more help on Angular CLI, use:
```sh
ng help
```
Or visit the [Angular CLI Documentation](https://angular.io/cli).

---

Now your Angular ABSA project is set up and ready to run! 🚀

