import React, { type FC, type ReactElement, type ReactNode } from "react";
import { Provider } from "react-redux";

// eslint-disable-next-line no-restricted-imports
import { type RenderOptions, render, userEvent } from "@testing-library/react-native";

import { createTestStore } from "@/testing/store";

interface Options extends RenderOptions {
  store?: ReturnType<typeof createTestStore>;
}

const customRender = async (ui: ReactElement, options?: Options) => {
  const event = userEvent.setup();
  const { store: injected, ...args } = options ?? {};
  const store = injected ?? createTestStore();

  const Wrapper: FC<{ children: ReactNode }> = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
  };

  const rendered = await render(ui, { wrapper: Wrapper, ...args });
  return { event, ...rendered };
};

export { customRender as render };
