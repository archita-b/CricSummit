import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, should } from "vitest";
import Predictions from "../../src/components/Predictions";

describe("GET predictions", () => {
  const predictions = [
    { input: "Input 1", output: "Output 1" },
    { input: "Input 2", output: "Output 2" },
  ];

  it("should have a heading called Prediction chart", () => {
    render(<Predictions predictions={predictions} />);

    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/prediction/i);
  });

  it("should render a chart of predictions", () => {
    const { getByText } = render(<Predictions predictions={predictions} />);

    predictions.forEach((prediction) => {
      expect(getByText(prediction.input)).toBeInTheDocument();
      expect(getByText(prediction.output)).toBeInTheDocument();
    });
  });
});
