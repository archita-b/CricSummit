# CricSummit

## Description

- This app predicts outcome of a shot played by a batter.
- The input takes a bowl_card, a shot_card and timing referring to how fast the ball is hit by the batter.
- Based on the inputs given, the output shows an outcome which is either the runs scored or an wicket, along with an appropriate commentary.

## How to run

- Clone the repository in your computer and switch to that directory.
- Run the following command

```
docker compose up
```

- Go to port `8080` in your `localhost`.

## To run the tests

##### Unit and component test:

- go to client directory
- Run the following command

```
npm run test
```

##### End-to-end test :

- go to client directory
- Run the following command

```
npm run test:e2e
```

##### Api test:

- go to server directory
- Run the following command

```
npm run test
```

Note: To run the test cases you need to explicitly install the node modules using `npm install`.
