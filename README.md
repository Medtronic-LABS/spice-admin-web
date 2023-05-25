# SPICE-Opensource

 [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=medtronic-labs_spice-admin-web&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=medtronic-labs_spice-admin-web)  [![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=medtronic-labs_spice-admin-web&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=medtronic-labs_spice-admin-web)  [![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=medtronic-labs_spice-admin-web&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=medtronic-labs_spice-admin-web)  [![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=medtronic-labs_spice-admin-web&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=medtronic-labs_spice-admin-web) [![Bugs](https://sonarcloud.io/api/project_badges/measure?project=medtronic-labs_spice-admin-web&metric=bugs)](https://sonarcloud.io/summary/new_code?id=medtronic-labs_spice-admin-web)

This is the client side for the Spice application to help track hypertensive and diabetic patients across a population.

## Tech stack

- HTML
- SCSS
- TypeScript
- React(17.x.x)
- Redux

## Setup

To bring the Spice client side up and running, there are few prerequisites that have to be followed.

- Install NodeJS v16.x.x. [Click here](https://nodejs.org/en/download)

- Install npm package

```sh
npm install -g npm@8
```

 Clone the spice-opensource repository.

```sh
git clone https://github.com/Medtronic-LABS/spice-admin-web.git
```

## Configuration

To run the application, The following properties are to be configured.
To achieve this, rename env.example file to .env for the following properties.


```properties
REACT_APP_BASE_URL=http://<your_server_url>:<port>/
REACT_APP_PASSWORD_HASH_KEY=sample_key
REACT_APP_CRYPTR_SECRET_KEY=sample_key
REACT_APP_GA_TRACKING_ID=2hb78n0
REACT_APP_ORG_SUCCESS_DELAY_TIME=545678
```

`/spice-opensource/frontend/`

## .env

The `.env` file is used to store environment variables for the project. These variables are used to configure the
application and contain sensitive information such as passwords, API keys, and other credentials.

Please note that the `.env` file should never be committed to version control, as it contains sensitive information that
should not be shared publicly. Instead, you should add the `.env` file to your .gitignore file to ensure that it is not
accidentally committed.

To use the application, you will need to create a `.env` file in the root directory of the project and add the necessary
environment variables. You can refer to the above file for an example of the required variables and their format.

***The values provided in the
instructions are for demonstration purposes only and will not work as-is. You will need to replace them with actual
values that are specific to your environment.***

## .env description

`REACT_APP_VERSION`: This variable could be used to specify the current version of the application.

`REACT_APP_BASE_URL`: This variable could be used to specify the base URL of the API that the application is consuming.

`REACT_APP_PASSWORD_HASH_KEY`: This variable could be used to store the password hash key that is used to hash passwords.

`REACT_APP_CRYPTR_SECRET_KEY`: This variable could be used to store the secret key used for encryption and decryption in the application.

`REACT_APP_ORG_SUCCESS_DELAY_TIME`: This variable could be used to specify the time delay for success messages displayed to the user.

`REACT_APP_GA_TRACKING_ID`: This variable could be used to specify the Google Analytics tracking ID for the application to track user behavior and activity.


## Sonarqube
The application has cleared sonarqube checkpoints. If you'd like to run the analysis, please install Sonarqube [Click here](https://docs.sonarqube.org/latest/)


## Install and Running the application in local

- Open to exact path

`/spice-opensource/frontend/`

- Install Dependencies

```sh
npm install
```

Node modules will be created based on the package.json after running this command.

- Start Application

```sh
npm start
```

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Testing the application

```sh
npm run test
```

Launches the test runner in the interactive watch mode.
See the section about running tests for more information.

## Deployment

```sh
npm run build
```

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

[Git Official site]:<https://git-scm.com/book/en/v2/Getting-Started-Installing-Git>[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

[Git Official site]:<https://git-scm.com/book/en/v2/Getting-Started-Installing-Git>