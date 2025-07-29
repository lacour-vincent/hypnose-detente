import React from "react";
import { View } from "react-native";

import { render } from "@/testing/render";

import SamplesHeader from "./index";

describe("<SamplesHeader />", () => {
  beforeAll(() => {
    const measureInWindow = jest.fn().mockImplementation((cb) => cb(0, 0, 0, 0, 0));
    View.prototype.measureInWindow = measureInWindow;
  });

  it("should render header right without crashing", () => {
    const { getByRole, getByTestId } = render(<SamplesHeader.HeaderRight />);
    expect(getByRole("button", { name: "Notation" })).toBeDefined();
    expect(getByTestId("star")).toBeDefined();
    expect(getByRole("button", { name: "Menu" })).toBeDefined();
    expect(getByTestId("dots-vertical")).toBeDefined();
  });

  it("should open rating dialog", async () => {
    const { getByRole, getByText, event } = render(<SamplesHeader.HeaderRight />);
    await event.press(getByRole("button", { name: "Notation" }));
    expect(getByText("Donnez-nous votre avis !")).toBeDefined();
  });

  it("should open 3 dots menu", async () => {
    const { getByRole, event } = render(<SamplesHeader.HeaderRight />);
    await event.press(getByRole("button", { name: "Menu" }));
    expect(getByRole("button", { name: "À propos" })).toBeDefined();
  });
});
