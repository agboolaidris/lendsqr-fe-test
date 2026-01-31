import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";

import { TextField } from "./TextField";
import styles from "./TextField.module.scss";

describe("TextField Component", () => {
  it("renders input element", () => {
    render(<TextField placeholder="Enter text" />);
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
  });

  it("renders label when provided", () => {
    render(<TextField label="Username" />);
    expect(screen.getByText("Username")).toBeInTheDocument();
  });

  it("renders hint when provided and no error", () => {
    render(<TextField hint="Enter your username" />);
    expect(screen.getByText("Enter your username")).toBeInTheDocument();
  });

  it("does not show hint when error exists", () => {
    render(<TextField hint="Hint text" error="Error text" />);
    expect(screen.queryByText("Hint text")).not.toBeInTheDocument();
  });

  it("shows required mark when required", () => {
    render(<TextField label="Email" required />);
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("renders error message", () => {
    render(<TextField error="Invalid value" />);
    expect(screen.getByText("Invalid value")).toBeInTheDocument();
  });

  it("sets aria-invalid when error exists", () => {
    render(<TextField error="Invalid" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("aria-invalid", "true");
  });

  it("links aria-describedby to error id", () => {
    render(<TextField error="Invalid" />);
    const input = screen.getByRole("textbox");
    const error = screen.getByRole("alert");

    expect(input.getAttribute("aria-describedby")).toBe(error.id);
  });

  it("does not render label when not provided", () => {
    render(<TextField />);
    expect(screen.queryByText("Username")).not.toBeInTheDocument();
  });

  it("does not render error block when error not provided", () => {
    render(<TextField />);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("renders left icon", () => {
    render(<TextField leftIcon={<span data-testid="left">L</span>} />);
    expect(screen.getByTestId("left")).toBeInTheDocument();
  });

  it("renders right icon", () => {
    render(<TextField rightIcon={<span data-testid="right">R</span>} />);
    expect(screen.getByTestId("right")).toBeInTheDocument();
  });

  it("applies icon padding classes when icons exist", () => {
    render(<TextField leftIcon={<span>L</span>} rightIcon={<span>R</span>} />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveClass(styles.inputHasLeftIcon);
    expect(input).toHaveClass(styles.inputHasRightIcon);
  });

  // -------------------------
  // ✅ Size variants
  // -------------------------

  it("applies size class", () => {
    render(<TextField size="lg" />);
    const input = screen.getByRole("textbox");

    expect(input).toHaveClass(styles["input--lg"]);
  });

  // -------------------------
  // ✅ Full width behavior (CSS MODULE SAFE)
  // -------------------------

  it("applies fullWidth wrapper class by default", () => {
    const { container } = render(<TextField />);
    expect(container.firstChild).toHaveClass(styles.fieldFullWidth);
  });

  it("does not apply fullWidth when disabled", () => {
    const { container } = render(<TextField fullWidth={false} />);
    expect(container.firstChild).not.toHaveClass(styles.fieldFullWidth);
  });

  it("renders addon when provided", () => {
    render(<TextField addon={<div>Addon content</div>} />);
    expect(screen.getByText("Addon content")).toBeInTheDocument();
  });

  it("uses provided id", () => {
    render(<TextField id="custom-id" label="Name" />);
    const input = screen.getByLabelText("Name");

    expect(input).toHaveAttribute("id", "custom-id");
  });

  it("generates id when not provided", () => {
    render(<TextField label="Auto ID" />);
    const input = screen.getByLabelText("Auto ID");

    expect(input.id).toBeTruthy();
  });

  it("matches snapshot — basic", () => {
    const { container } = render(<TextField label="Snap" />);
    expect(container).toMatchSnapshot();
  });

  it("matches snapshot — with error + icons", () => {
    const { container } = render(
      <TextField
        label="Email"
        error="Required"
        leftIcon={<span>L</span>}
        rightIcon={<span>R</span>}
        addon={<div>Help</div>}
        size="lg"
      />,
    );

    expect(container).toMatchSnapshot();
  });
});
