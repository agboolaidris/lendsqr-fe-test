import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Typography } from "./Typography";

describe("Typography Component", () => {
  it("renders children correctly", () => {
    render(<Typography>Hello World</Typography>);
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  it("uses default element based on size", () => {
    render(<Typography size="5xl">Heading</Typography>);
    const el = screen.getByText("Heading");
    expect(el.tagName).toBe("H1");
  });

  it("uses custom element when 'as' prop is provided", () => {
    render(
      <Typography as="label" {...{ htmlFor: "x" }}>
        Label Text
      </Typography>,
    );
    const el = screen.getByText("Label Text");
    expect(el.tagName).toBe("LABEL");
  });

  it("applies size, weight and variant classes", () => {
    render(
      <Typography size="xl" weight="bold" variant="primary">
        Styled Text
      </Typography>,
    );

    const el = screen.getByText("Styled Text");

    expect(el.className).toContain("typography--xl");
    expect(el.className).toContain("typography--bold");
    expect(el.className).toContain("typography--primary");
  });

  it("applies alignment class", () => {
    render(<Typography align="center">Centered</Typography>);
    const el = screen.getByText("Centered");

    expect(el.className).toContain("typography--align-center");
  });

  it("applies truncate class when truncate is true", () => {
    render(<Typography truncate>Truncated</Typography>);
    const el = screen.getByText("Truncated");

    expect(el.className).toContain("typographyTruncate");
  });

  it("applies lineClamp class", () => {
    render(<Typography lineClamp={3}>Clamp</Typography>);
    const el = screen.getByText("Clamp");

    expect(el.className).toContain("typography--line-clamp-3");
  });

  it("passes custom className", () => {
    render(<Typography className="custom-class">Custom Class</Typography>);

    const el = screen.getByText("Custom Class");
    expect(el.className).toContain("custom-class");
  });

  it("sets data attributes correctly", () => {
    render(
      <Typography size="lg" weight="medium" variant="secondary">
        Data Attr
      </Typography>,
    );

    const el = screen.getByText("Data Attr");

    expect(el).toHaveAttribute("data-size", "lg");
    expect(el).toHaveAttribute("data-weight", "medium");
    expect(el).toHaveAttribute("data-variant", "secondary");
  });

  it("applies inline styles when provided", () => {
    render(<Typography style={{ color: "red" }}>Styled Inline</Typography>);

    const el = screen.getByText("Styled Inline");

    // jsdom converts red → rgb(255, 0, 0)
    expect(el).toHaveStyle({ color: "rgb(255, 0, 0)" });
  });

  it("does not apply truncate class when truncate is false", () => {
    render(<Typography truncate={false}>No Truncate</Typography>);
    const el = screen.getByText("No Truncate");

    expect(el.className).not.toContain("typographyTruncate");
  });

  it("does not apply align class when align is not provided", () => {
    render(<Typography>No Align</Typography>);
    const el = screen.getByText("No Align");

    expect(el.className).not.toContain("typography--align-");
  });

  it("does not apply lineClamp class when not set", () => {
    render(<Typography>No Clamp</Typography>);
    const el = screen.getByText("No Clamp");

    expect(el.className).not.toContain("line-clamp");
  });

  it("renders correctly with minimal props", () => {
    render(<Typography>Minimal</Typography>);
    const el = screen.getByText("Minimal");

    expect(el.tagName).toBe("P"); // default for base size
    expect(el).toBeInTheDocument();
  });

  it("matches snapshot — default", () => {
    const { container } = render(<Typography>Snapshot</Typography>);
    expect(container).toMatchSnapshot();
  });

  it("matches snapshot — complex variant", () => {
    const { container } = render(
      <Typography
        size="3xl"
        weight="semibold"
        variant="danger"
        align="right"
        lineClamp={2}
        truncate
      >
        Complex Snapshot
      </Typography>,
    );

    expect(container).toMatchSnapshot();
  });
});
