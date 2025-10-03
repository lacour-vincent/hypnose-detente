import React from "react";
import { View } from "react-native";

import { render } from "@/testing/render";

import Menu, { type MenuItem } from "./index";

const items: MenuItem[] = [
  { label: "menu-item-1", callback: jest.fn() },
  { label: "menu-item-2", callback: jest.fn() },
  { label: "menu-item-3", callback: jest.fn() },
];

describe("<Menu />", () => {
  beforeAll(() => {
    const measure = jest.fn().mockImplementation((cb) => cb(0, 0, 0, 0, 0, 0, 0));
    View.prototype.measure = measure;
  });

  it("should render without crashing", async () => {
    const props = { position: { vertical: "top" as const, horizontal: "left" as const }, items };
    const { getByRole, getByTestId, event } = render(<Menu {...props} />);
    expect(getByTestId("dots-vertical")).toBeDefined();
    await event.press(getByRole("button", { name: "Menu" }));
    props.items.forEach((item) => expect(getByRole("button", { name: item.label })).toBeDefined());
  });

  it("should call an item callback and close the menu", async () => {
    const props = { position: { vertical: "top" as const, horizontal: "left" as const }, items };
    const { getByRole, queryByRole, event } = render(<Menu {...props} />);
    await event.press(getByRole("button", { name: "Menu" }));
    await event.press(getByRole("button", { name: props.items[0].label }));
    expect(props.items[0].callback).toHaveBeenCalled();
    expect(queryByRole("button", { name: props.items[0].label })).toBeNull();
  });
});
