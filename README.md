# InPoTracker


## Setup
Execute the following commands to download all node modules and spin up the local server:
```bash
npm install
npm run devStart
```

## Testing With route.rest
This project has an included route.rest file.
If you're using visual studio code, you can download the extension `REST Client` by Huachao Mao to easily run through the test cases provided.
To do so:
1. Open up route.rest in the root dir
2. Click on `Send Request` above each endpoint.
3. View outputted results in response file that is opened


If you are not using vscode, or do not want to download the extension, you can still copy/paste each request in the file and use curl instead! 

Each endpoint included in this repo is listed in this file with examples of its use case/how to call it directly.

## Executing Test Files
Once you have installed all node modules run the following command to execute the test file:
```bash
mocha test/generateFinanceTerms_test.js
```
