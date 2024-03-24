import { describe, expect, it } from "vitest";
import request from "supertest";
import app from "../app.js";
import { deletePredictionDB } from "../model/cards.js";

describe("GET /api/cards", () => {
  it("should respond with json", async () => {
    const response = await request(app).get("/api/cards");

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.statusCode).toBe(200);
  });

  it("should return an object of different cards", async () => {
    const response = await request(app).get("/api/cards");

    expect(response.body).toBeInstanceOf(Object);
  });
});

describe("GET /api/prediction", () => {
  it("should respond with json", async () => {
    const response = await request(app).get("/api/prediction");

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.statusCode).toBe(200);
  });

  it("should return an array of predictions", async () => {
    const response = await request(app).get("/api/prediction");

    expect(response.body).toBeInstanceOf(Array);
  });
});

describe("POST /api/prediction", async () => {
  const predictionData = {
    bowlCardName: "Bouncer",
    shotCardName: "Flick",
    shotTiming: "Perfect",
  };

  const response = await request(app)
    .post("/api/prediction")
    .send(predictionData);

  const existingResponse = await request(app)
    .post("/api/prediction")
    .send(predictionData);

  it("should create new prediction", async () => {
    expect(response.statusCode).toBe(201);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body).toBeDefined();
    expect(response.body.output).toBeDefined();
  });

  it("should send the existing prediction", async () => {
    expect(existingResponse.statusCode).toBe(200);
    expect(existingResponse.headers["content-type"]).toMatch(/json/);
    expect(existingResponse.body).toBeDefined();
  });

  it("should send an error message", async () => {
    const incompleteInput = {
      bowlCardName: "",
      shotCardName: "",
      shotTiming: "",
    };

    const response = await request(app)
      .post("/api/prediction")
      .send(incompleteInput);

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body).toHaveProperty("error");
  });

  await deletePredictionDB(
    `${predictionData.bowlCardName} ${predictionData.shotCardName} ${predictionData.shotTiming}`
  );
});
