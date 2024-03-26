import React from "react";
import {
  render,
  screen,
  fireEvent,
  getByTestId,
  getByRole,
} from "@testing-library/react";
import { waitFor } from "@testing-library/react";
import ShotCard from "../../src/components/ShotCard";

describe("ShotCard", () => {
  const shotCardNames = [
    { id: 1, shot_card_name: "Option 1" },
    { id: 2, shot_card_name: "Option 2" },
    { id: 3, shot_card_name: "Option 3" },
  ];

  const setShotCardMock = (value) => {
    console.log(value);
  };

  it("should have a heading named shot card name", () => {
    render(
      <ShotCard
        setShotCard={setShotCardMock}
        shotCardNames={shotCardNames}
        shotCard={""}
      />
    );
    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/shot/i);
  });

  it("should render a select menu", async () => {
    render(
      <ShotCard
        setShotCard={setShotCardMock}
        shotCard={""}
        shotCardNames={shotCardNames}
      />
    );

    const selectElement = screen.getByTestId("shot-card-select");
    waitFor(async () => {
      expect(selectElement).toBeInTheDocument();

      const option = "Option 2";
      await fireEvent.change(selectElement, { target: { value: option } });

      expect(setShotCard).toHaveBeenCalledWith(option);
    });
  });
});
