import React from "react";
import {
  render,
  screen,
  fireEvent,
  getByTestId,
  getByRole,
} from "@testing-library/react";
import { waitFor } from "@testing-library/react";
import BowlCard from "../../src/components/BowlCard";

describe("BowlCard", () => {
  const bowlCardNames = [
    { id: 1, bowl_card_name: "Option 1" },
    { id: 2, bowl_card_name: "Option 2" },
    { id: 3, bowl_card_name: "Option 3" },
  ];

  const setBowlCardMock = (value) => {
    console.log(value);
  };

  it("should have a heading named bowl card name", () => {
    render(
      <BowlCard
        setBowlCard={setBowlCardMock}
        bowlCardNames={bowlCardNames}
        bowlCard={""}
      />
    );
    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/bowl/i);
  });

  it("should render a select menu", async () => {
    render(
      <BowlCard
        setBowlCard={setBowlCardMock}
        bowlCard={""}
        bowlCardNames={bowlCardNames}
      />
    );

    const selectElement = screen.getByTestId("bowl-card-select");
    waitFor(async () => {
      expect(selectElement).toBeInTheDocument();

      const option = "Option 2";
      await fireEvent.change(selectElement, { target: { value: option } });

      expect(setBowlCard).toHaveBeenCalledWith(option);
    });
  });
});
