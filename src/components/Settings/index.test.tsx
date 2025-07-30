import React from "react";

import { render } from "@/testing/react-native";

import Settings from "./index";

describe("<Settings />", () => {
  it("should render without crashing", () => {
    const { getByRole, getByText } = render(<Settings />);
    expect(getByRole("button", { name: "Désactiver l'optimisation de la batterie" })).toBeDefined();
    expect(getByText("Désactiver l'optimisation de la batterie")).toBeDefined();
    expect(getByText(/Désactivez ce paramètre pour éviter les coupures/)).toBeDefined();
  });
});
