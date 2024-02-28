import express from "express";
import cors from "cors";
import cardsRouter from "./routes/cards.js";

const PORT = 3000;
const app = express();

app.use(cors("http://localhost:5173"));

app.use(express.json());
app.use("/api", cardsRouter);

app.listen(PORT, (error) => {
  if (!error) {
    console.log(`Server is running on port ${PORT}`);
  } else {
    console.log("Error connecting to server", error);
  }
});
