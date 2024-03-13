# CricSummit

## Description

- This app predicts outcome of a shot played by a batter.
- The input takes a bowl_card, a shot_card and timing referring to how fast the ball is hit by the batter.
- Based on the inputs given, the output shows an outcome which is either the runs scored or an wicket, along with an appropriate commentary.

## How to run

- Clone the repository in your computer and switch to that directory.
- Install the dependencies using

  ```
  npm i
  ```

  switching to client and server directory.

- Commands for installing postgres locally can be found here
  <https://www.codecademy.com/article/installing-and-using-postgresql-locally>

- Create a .env file containing the database secrets. This is how it should look like:

```
DB_HOST=localhost
DB_PORT=my_port
DB_DATABASE=my_database
DB_USERNAME=my_username
DB_PASSWORD=my_password
```

- Run the schema specified in ./server/model/schema/schema.sql

- Switch to client directory and run

```
npm run dev
```

and switch to server directory and run

```
npm run dev
```

- Access the application in your browser at http://localhost:5173.
