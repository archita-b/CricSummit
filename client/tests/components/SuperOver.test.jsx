import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import SuperOver from "../../src/components/SuperOver";
import { expect } from "vitest";

describe("SuperOver component", () => {
  const predictions = [
    {
      input: "Bouncer Pull Perfect",
      output: "Just over the fielder - 4 runs",
    },
  ];

  const setShotCardMock = (value) => {
    console.log(value);
  };

  const setShotTimeMock = (value) => {
    console.log(value);
  };

  it("should render the bowl card names of super over", () => {
    render(
      <SuperOver
        shotTime="Time 1"
        shotCard="card 1"
        setShotTime={setShotTimeMock}
        setShotCard={setShotCardMock}
        predictions={predictions}
      />
    );

    const cards = screen.getAllByRole("listitem");
    expect(cards.length).toBe(6);
  });

  it("should highlight the current bowling card", () => {
    render(
      <SuperOver
        shotTime="Time 1"
        shotCard="card 1"
        setShotTime={setShotTimeMock}
        setShotCard={setShotCardMock}
        predictions={predictions}
      />
    );

    const highlightedCard = screen.getByText(/Bouncer/i);
    expect(highlightedCard).toHaveClass("super-over-bowl");
  });

  it("should display output details when a shot is played", () => {
    render(
      <SuperOver predictions={predictions} shotCard="Pull" shotTime="Perfect" />
    );
    const bowlerText = screen.queryByText(/bowled ball/i);
    const batsmanText = screen.queryByText(/played shot/i);

    waitFor(() => {
      expect(bowlerText).toBeInTheDocument();
      expect(batsmanText).toBeInTheDocument();
    });
  });

  it("should show final output when game is over", () => {
    const score = 18;
    const target = 15;

    render(
      <SuperOver
        shotTime="Time 1"
        shotCard="card 1"
        setShotTime={setShotTimeMock}
        setShotCard={setShotCardMock}
        predictions={predictions}
      />
    );
    const finalScore = screen.queryByText(/scored runs/i);
    const result = screen.queryByText(/\b(?:won|lost)\b/i);

    waitFor(() => {
      expect(finalScore).toBeInTheDocument();
      expect(result).toBeInTheDocument();
    });
  });

  it("should hide output details and updates score/wickets on next button click", async () => {
    const target = 20,
      score = 10,
      wicketsAvailable = 2;
    render(
      <SuperOver
        shotTime="Time 1"
        shotCard="card 1"
        setShotTime={setShotTimeMock}
        setShotCard={setShotCardMock}
        predictions={predictions}
      />
    );

    const nextButton = screen.getByRole("button", { name: /Next/i });
    await fireEvent.click(nextButton);

    const finalScore = screen.queryByText(/scored runs/i);
    const result = screen.queryByText(/\b(?:won|lost)\b/i);

    expect(finalScore).not.toBeInTheDocument();
    expect(result).not.toBeInTheDocument();

    const scoreElement = screen.getByText(/Score: \d+/i);
  });
});
