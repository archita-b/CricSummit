const responseData = {
  bowlCardNames: [
    { id: 1, bowl_card_name: "Bouncer" },
    { id: 2, bowl_card_name: "Inswinger" },
    { id: 3, bowl_card_name: "Outswinger" },
    { id: 4, bowl_card_name: "Leg cutter" },
    { id: 5, bowl_card_name: "Off cutter" },
    { id: 6, bowl_card_name: "Slower ball" },
    { id: 7, bowl_card_name: "Yorker" },
    { id: 8, bowl_card_name: "Pace" },
    { id: 9, bowl_card_name: "Off break" },
    { id: 10, bowl_card_name: "Doosra" },
  ],
  shotCardNames: [
    { id: 1, shot_card_name: "Straight" },
    { id: 2, shot_card_name: "Sweep" },
    { id: 3, shot_card_name: "Flick" },
    { id: 4, shot_card_name: "CoverDrive" },
    { id: 5, shot_card_name: "LegLance" },
    { id: 6, shot_card_name: "Pull" },
    { id: 7, shot_card_name: "Long on" },
    { id: 8, shot_card_name: "Scoop" },
    { id: 9, shot_card_name: "Square cut" },
    { id: 10, shot_card_name: "UpperCut" },
  ],
  shotTimings: [
    { id: 1, shot_timing_name: "Early" },
    { id: 2, shot_timing_name: "Good" },
    { id: 3, shot_timing_name: "Perfect" },
    { id: 4, shot_timing_name: "Late" },
  ],
};

const predictionData = [
  {
    input: "Bouncer Pull Perfect",
    output: "Just over the fielder - 4 runs",
  },
];

describe("Home Page", () => {
  beforeEach(() => {
    cy.intercept("GET", "/api/cards", responseData).as("getCards");
    cy.intercept("GET", "/api/prediction", predictionData).as("getPrediction");
    cy.intercept("POST", "/api/prediction", (req) => {
      const { bowlCardName, shotCardName, shotTiming } = req.body;

      const predictionInputString = `${bowlCardName} ${shotCardName} ${shotTiming}`;

      // Check if the input already exists in the prediction array
      const existingPrediction = predictionData.find(
        (prediction) => prediction.input === predictionInputString
      );

      if (!existingPrediction) {
        // Create a dummy output prediction and add it to the prediction array
        const dummyOutput = "Dummy output prediction";
        const predict = { input: predictionInputString, output: dummyOutput };
        predictionData.push(predict);
        const responseStatus = 201;
        const responseBody = predict;
        req.reply({
          status: responseStatus,
          body: responseBody,
        });
      } else {
        const responseStatus = 200;
        const responseBody = existingPrediction;
        req.reply({
          status: responseStatus,
          body: responseBody,
        });
      }

      // Respond with the updated prediction array and appropriate status code
    }).as("postPrediction");
  });
  // });
  it("should select options and submit the form", () => {
    cy.visit("/");

    cy.get('select[data-testid="bowl-card-select"]').select("Bouncer");

    cy.get('select[data-testid="shot-card-select"]').select("Flick");

    cy.get('select[data-testid="shot-time-select"]').select("Early");

    cy.get(".submit-input-btn").click();
  });
});
