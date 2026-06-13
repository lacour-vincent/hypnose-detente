import React from "react";

import { render, screen } from "@/testing/react-native";

import Snackbar from "./index";

const defaultProps = {
  message: "snackbar-message",
  onClose: jest.fn(),
};

describe("<Snackbar />", () => {
  it("should render without crashing", async () => {
    const props = { ...defaultProps };
    await render(<Snackbar {...props} />);
    await screen.findByRole("button", { name: "fermer" });

    expect(screen.getByText(props.message)).toBeOnTheScreen();
    expect(screen.getByRole("button", { name: "fermer" })).toBeEnabled();
  });

  it("should call onClose with close button", async () => {
    const props = { ...defaultProps };
    const { event } = await render(<Snackbar {...props} />);
    expect(await screen.findByRole("button", { name: "fermer" })).toBeOnTheScreen();

    await event.press(screen.getByRole("button", { name: "fermer" }));
    expect(props.onClose).toHaveBeenCalled();
  });
});
