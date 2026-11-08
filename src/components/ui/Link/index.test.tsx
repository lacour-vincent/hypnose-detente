import React from "react";
import { Text } from "react-native";

import { render, screen } from "@/testing/react-native";

import Link from "./index";

const defaultProps = { href: "/some-route" };

describe("<Link />", () => {
  it("should render without crashing", async () => {
    const props = { ...defaultProps, children: <Text>Link</Text> };
    // eslint-disable-next-line @eslint-react/jsx-no-children-prop
    await render(<Link {...props} />);
    expect(screen.getByRole("link", { name: "Link" })).toBeDefined();
    expect(screen.getByRole("link", { name: "Link" })).toHaveProp("href", props.href);
  });
});
