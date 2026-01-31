import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { CompanyLogo, CompanyLogoProps } from "./CompanyLogo";

// MOCK NEXT IMAGE
vi.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt, width, height, ...props }: CompanyLogoProps) => (
    <img src={src} alt={alt} width={width} height={height} {...props} />
  ),
}));

describe("CompanyLogo", () => {
  it("renders full logo by default", () => {
    render(<CompanyLogo />);
    const img = screen.getByAltText("lendsqr logo") as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toContain("/full-logo.svg");
    expect(img.width).toBe(174);
    expect(img.height).toBe(36);
  });

  it("renders icon logo when type is 'icon'", () => {
    render(<CompanyLogo type="icon" />);
    const img = screen.getByAltText("lendsqr logo") as HTMLImageElement;
    expect(img.src).toContain("/icon-logo.svg");
  });

  it("respects custom width and height props", () => {
    render(<CompanyLogo width={100} height={50} />);
    const img = screen.getByAltText("lendsqr logo") as HTMLImageElement;
    expect(img.width).toBe(100);
    expect(img.height).toBe(50);
  });

  it("passes extra props to the img element", () => {
    render(<CompanyLogo className="my-class" data-testid="logo" />);
    const img = screen.getByTestId("logo") as HTMLImageElement;
    expect(img).toHaveClass("my-class");
  });
});
