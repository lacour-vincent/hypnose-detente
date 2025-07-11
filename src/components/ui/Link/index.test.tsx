import React from "react";

import { render } from "@/testing/render";

import Link from "./index";

const defaultProps = { href: "/some-route" };

describe("<Link />", () => {
  it("should render without crashing", () => {
    const props = { ...defaultProps };
    const { getByRole } = render(<Link {...props}>Link</Link>);
    expect(getByRole("link", { name: "Link" })).toBeDefined();
    expect(getByRole("link", { name: "Link" })).toHaveProp("href", props.href);
  });
});
