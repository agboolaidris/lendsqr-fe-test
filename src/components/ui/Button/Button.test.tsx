import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Button } from "./Button";

describe("Button", () => {
  it("renders button text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button")).toHaveTextContent("Click me");
  });

  it("applies variant and size classes", () => {
    render(
      <Button variant="danger-outline" size="lg">
        Delete
      </Button>,
    );

    const btn = screen.getByRole("button");

    expect(btn.className).toMatch("button--danger-outline");
    expect(btn.className).toMatch("button--lg");
  });

  // ✅ POSITIVE — click works
  it("fires onClick when clicked", () => {
    const handleClick = vi.fn();

    render(<Button onClick={handleClick}>Submit</Button>);

    fireEvent.click(screen.getByRole("button"));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // ❌ NEGATIVE — disabled blocks click
  it("does not fire click when disabled", () => {
    const handleClick = vi.fn();

    render(
      <Button disabled onClick={handleClick}>
        Submit
      </Button>,
    );

    fireEvent.click(screen.getByRole("button"));

    expect(handleClick).not.toHaveBeenCalled();
  });

  // ✅ POSITIVE — loading state shows spinner
  it("shows spinner when loading", () => {
    render(<Button loading>Saving</Button>);

    expect(document.querySelector("svg.spinner")).toBeInTheDocument();
  });

  // ❌ NEGATIVE — loading disables button click
  it("does not allow click when loading", () => {
    const handleClick = vi.fn();

    render(
      <Button loading onClick={handleClick}>
        Save
      </Button>,
    );

    fireEvent.click(screen.getByRole("button"));

    expect(handleClick).not.toHaveBeenCalled();
  });

  // ✅ POSITIVE — loading sets disabled attribute
  it("is disabled when loading", () => {
    render(<Button loading>Wait</Button>);

    expect(screen.getByRole("button")).toBeDisabled();
  });

  // ✅ POSITIVE — renders asChild correctly
  it("renders asChild with anchor tag", () => {
    render(
      <Button asChild>
        <a href="/home">Home</a>
      </Button>,
    );

    expect(screen.getByRole("link")).toHaveAttribute("href", "/home");
  });

  // ❌ NEGATIVE — spinner not shown when not loading
  it("does not show spinner when not loading", () => {
    render(<Button>Normal</Button>);

    expect(document.querySelector("svg.spinner")).not.toBeInTheDocument();
  });
});
