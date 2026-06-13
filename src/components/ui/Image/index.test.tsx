import React from "react";

import { render, screen } from "@/testing/react-native";

import Image from "./index";

const defaultProps = { src: { uri: "image-uri" }, alt: "accessibility-label" };

describe("<Image />", () => {
  it("should render without crashing", async () => {
    const props = { ...defaultProps };
    await render(<Image {...props} />);
    expect(screen.getByRole("img", { name: props.alt })).toBeDefined();
  });
});
