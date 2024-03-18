import React from "react";
import {
  render,
  screen,
  fireEvent,
  getByTestId,
  getByRole,
} from "@testing-library/react";
import { waitFor } from "@testing-library/react";
import ShotTime from "../../src/components/ShotTime";

describe("ShotTime", () => {
  const shotTimingNames = [
    { id: 1, shot_timing_name: "Option 1" },
    { id: 2, shot_timing_name: "Option 2" },
    { id: 3, shot_timing_name: "Option 3" },
  ];

  const setShotTimeMock = (value) => {
    console.log(value);
  };

  it("should have a heading named shot timing", () => {
    render(
      <ShotTime
        setShotTime={setShotTimeMock}
        shotTimingNames={shotTimingNames}
        shotTime={""}
      />
    );
    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/timing/i);
  });

  it("should render a select menu", async () => {
    render(
      <ShotTime
        setShotTime={setShotTimeMock}
        shotTimingNames={shotTimingNames}
        shotTime={""}
      />
    );

    const selectElement = screen.getAllByTestId("shot-time-select");
    waitFor(async () => {
      expect(selectElement).toBeInTheDocument();

      const option = "Option 2";
      await fireEvent.change(selectElement, { target: { value: option } });

      expect(setShotTimeMock).toHaveBeenCalledWith(option);
    });
  });
});
