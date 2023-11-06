import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

import { LoadingButton } from "./loading-button";

test("LoadingButton should be disabled when isLoading is true", () => {
  render(<LoadingButton isLoading />);
  const button = screen.getByRole("button");
  expect(button).toBeDisabled();
});

test("disabled prop should not be overrided when is loading", () => {
  render(<LoadingButton disabled={false} isLoading />);
  const button = screen.getByRole("button");
  expect(button).toBeDisabled();
});
