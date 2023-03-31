# Node.js Fulltimeforce assessment

## Requirements

* Node.js >= 16.X

## Getting started

* Switch to develop branch

    ```#bash
    git checkout develop
    ```

* Install all the dependencies using npm

    ```#bash
    npm install
    ```

* Copy `.env.example` file to `.env`. The value for the env `GITHUB_ACCESS_TOKEN` must be required for security.

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

You can now access the app at <http://localhost:3001>
