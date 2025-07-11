import React from "react";

import { render } from "@/testing/render";

import Snackbar from "./index";

const defaultProps = {
  message: "snackbar-message",
  onClose: jest.fn(),
};

describe("<Snackbar />", () => {
  it("should render without crashing", async () => {
    const props = { ...defaultProps };
    const { findByRole, getByRole, getByText } = render(<Snackbar {...props} />);
    await findByRole("button", { name: "fermer" });

    expect(getByText(props.message)).toBeOnTheScreen();
    expect(getByRole("button", { name: "fermer" })).toBeEnabled();
  });

  it("should call onClose from the elapsed time", async () => {
    const props = { ...defaultProps };
    const { findByRole } = render(<Snackbar {...props} />);
    expect(await findByRole("button", { name: "fermer" })).toBeOnTheScreen();
    jest.advanceTimersByTime(6000);

    expect(props.onClose).toHaveBeenCalled();
  });

  it("should call onClose with close button", async () => {
    const props = { ...defaultProps };
    const { findByRole, getByRole, event } = render(<Snackbar {...props} />);
    expect(await findByRole("button", { name: "fermer" })).toBeOnTheScreen();

    await event.press(getByRole("button", { name: "fermer" }));
    expect(props.onClose).toHaveBeenCalled();
  });
});
