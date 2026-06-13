import React from "react";
import { View } from "react-native";

import { render, screen } from "@/testing/react-native";

import SamplesHeader from "./index";

describe("<SamplesHeader />", () => {
  beforeAll(() => {
    const measure = jest.fn().mockImplementation((cb) => cb(0, 0, 0, 0, 0, 0, 0));
    View.prototype.measure = measure;
  });

  it("should render header right without crashing", async () => {
    await render(<SamplesHeader.HeaderRight />);
    expect(screen.getByRole("button", { name: "Notation" })).toBeDefined();
    expect(screen.getByTestId("star")).toBeDefined();
    expect(screen.getByRole("button", { name: "Menu" })).toBeDefined();
    expect(screen.getByTestId("dots-vertical")).toBeDefined();
  });

  it("should open rating dialog", async () => {
    const { event } = await render(<SamplesHeader.HeaderRight />);
    await event.press(screen.getByRole("button", { name: "Notation" }));
    expect(screen.getByText("Donnez-nous votre avis !")).toBeDefined();
  });

  it("should open 3 dots menu", async () => {
    const { event } = await render(<SamplesHeader.HeaderRight />);
    await event.press(screen.getByRole("button", { name: "Menu" }));
    expect(screen.getByRole("button", { name: "À propos" })).toBeDefined();
  });
});
