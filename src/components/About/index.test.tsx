import React from "react";

import { render } from "@/testing/react-native";

import About from "./index";

describe("<About />", () => {
  it("should render without crashing", () => {
    const { getByRole, getByText } = render(<About />);

    expect(getByRole("img", { name: "logo" })).toBeDefined();
    expect(getByText("Hypnose — Détente")).toBeDefined();
    expect(getByText(/Pour profiter pleinement de vos séances/)).toBeDefined();

    expect(getByRole("button", { name: "2.0.0" })).toBeEnabled();
    expect(getByRole("button", { name: "Site officiel" })).toBeEnabled();
    expect(getByRole("button", { name: "Rapporter un problème" })).toBeEnabled();
    expect(getByRole("button", { name: "Conditions générales d'utilisation" })).toBeEnabled();
    expect(getByRole("button", { name: "Politique de confidentialité" })).toBeEnabled();
    expect(getByRole("button", { name: "Développeur" })).toBeEnabled();
  });
});
