const responseData = {
  bowlCardNames: [
    { id: 1, bowl_card_name: "Bouncer" },
    { id: 2, bowl_card_name: "Inswinger" },
    { id: 3, bowl_card_name: "Outswinger" },
  ],
  shotCardNames: [
    { id: 1, shot_card_name: "Straight" },
    { id: 2, shot_card_name: "Sweep" },
    { id: 3, shot_card_name: "Flick" },
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
  let initialRowCount, finalRowCount;

  beforeEach(() => {
    cy.intercept("GET", "/api/cards", responseData).as("getCards");
    cy.intercept("GET", "/api/prediction", predictionData).as("getPrediction");
    cy.intercept("POST", "/api/prediction", (req) => {
      const { bowlCardName, shotCardName, shotTiming } = req.body;

      const predictionInputString = `${bowlCardName} ${shotCardName} ${shotTiming}`;

      const existingPrediction = predictionData.find(
        (prediction) => prediction.input === predictionInputString
      );

      if (!existingPrediction) {
        const dummyOutput = "Dummy output prediction string";
        const prediction = {
          input: predictionInputString,
          output: dummyOutput,
        };

        predictionData.push(prediction);

        const responseStatus = 201;
        const responseBody = prediction;

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
    }).as("postPrediction");
  });

  it("should select options and submit", () => {
    cy.visit("/");
    cy.get('table[data-testid="prediction-chart"]').should("be.visible");

    cy.get('select[data-testid="bowl-card-select"]').select("Bouncer");

    cy.get('select[data-testid="shot-card-select"]').select("Flick");

    cy.get('select[data-testid="shot-time-select"]').select("Early");

    cy.get('table[data-testid="prediction-chart"]')
      .find("tr")
      .then(($rows) => {
        initialRowCount = $rows.length;
      })
      .as("initalTableLoad");

    cy.get(".submit-input-btn").click();

    cy.get('table[data-testid="prediction-chart"]')
      .find("tr")
      .then(($rows) => {
        finalRowCount = $rows.length;
        expect(finalRowCount).to.be.greaterThan(initialRowCount);
      })
      .as("newRowAdded");
  });
});
