import React from "react";

import { render, screen } from "@/testing/react-native";

import Settings from "./index";

describe("<Settings />", () => {
  it("should render without crashing", async () => {
    await render(<Settings />);
    expect(screen.getByRole("button", { name: "Désactiver l'optimisation de la batterie" })).toBeDefined();
    expect(screen.getByText("Désactiver l'optimisation de la batterie")).toBeDefined();
    expect(screen.getByText(/Désactivez ce paramètre pour éviter les coupures/)).toBeDefined();
  });
});
