import React from "react";

import { render, screen } from "@/testing/react-native";

import About from "./index";

describe("<About />", () => {
  it("should render without crashing", async () => {
    await render(<About />);

    expect(screen.getByRole("img", { name: "logo" })).toBeDefined();
    expect(screen.getByText("Hypnose — Détente")).toBeDefined();
    expect(screen.getByText(/Pour profiter pleinement de vos séances/)).toBeDefined();

    expect(screen.getByRole("button", { name: "Site officiel" })).toBeEnabled();
    expect(screen.getByRole("button", { name: "Rapporter un problème" })).toBeEnabled();
    expect(screen.getByRole("button", { name: "mock" })).toBeEnabled();
    expect(screen.getByRole("button", { name: "Code source" })).toBeEnabled();
    expect(screen.getByRole("button", { name: "Conditions générales d'utilisation" })).toBeEnabled();
    expect(screen.getByRole("button", { name: "Politique de confidentialité" })).toBeEnabled();
  });
});
