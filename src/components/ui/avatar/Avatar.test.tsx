// Avatar.test.tsx
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Avatar, AvatarProps } from "./Avatar";

// Mock next/image for tests
vi.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: AvatarProps) => (
    <img src={src} alt={alt} {...props} />
  ),
}));

describe("Avatar Component", () => {
  const altText = "Agboola Idris";

  it("renders the image when src is provided", () => {
    render(<Avatar src="/avatar.png" alt={altText} />);

    const image = screen.getByAltText(altText) as HTMLImageElement;
    expect(image).toBeInTheDocument();
    expect(image.src).toContain("/avatar.png");
  });

  it("renders fallback initials when src is missing", () => {
    render(<Avatar alt={altText} />);

    expect(screen.getByText("AI")).toBeInTheDocument();
  });

  it("renders fallback initials when image fails to load", () => {
    render(<Avatar src="/broken.png" alt={altText} />);
    const image = screen.getByAltText(altText) as HTMLImageElement;

    // Trigger onError
    fireEvent.error(image);

    expect(screen.getByText("AI")).toBeInTheDocument();
  });

  it("renders single-letter initials when only one word is provided", () => {
    render(<Avatar alt="Idris" />);
    expect(screen.getByText("I")).toBeInTheDocument();
  });

  it("renders default 'U' when alt is empty", () => {
    render(<Avatar alt="" />);
    expect(screen.getByText("U")).toBeInTheDocument();
  });

  it("applies size and shape classes", () => {
    const { container } = render(
      <Avatar alt={altText} size="lg" shape="square" />,
    );
    const avatar = container.firstChild as HTMLElement;

    expect(avatar.className).toContain("avatar--lg");
    expect(avatar.className).toContain("avatar--square");
  });

  it("applies bordered and interactive classes", () => {
    const { container } = render(<Avatar alt={altText} bordered interactive />);
    const avatar = container.firstChild as HTMLElement;

    expect(avatar.className).toContain("avatarBordered");
    expect(avatar.className).toContain("avatarInteractive");
  });

  it("sets correct role and tabIndex when interactive", () => {
    const { container } = render(<Avatar alt={altText} interactive />);
    const avatar = container.firstChild as HTMLElement;

    expect(avatar.getAttribute("role")).toBe("button");
    expect(avatar.getAttribute("tabindex")).toBe("0");
  });

  it("sets role as img and no tabIndex when not interactive", () => {
    const { container } = render(<Avatar alt={altText} />);
    const avatar = container.firstChild as HTMLElement;

    expect(avatar.getAttribute("role")).toBe("img");
    expect(avatar.hasAttribute("tabindex")).toBe(false);
  });

  it("matches snapshot for fallback", () => {
    const { container } = render(<Avatar alt={altText} />);
    expect(container).toMatchSnapshot();
  });

  it("matches snapshot for image avatar", () => {
    const { container } = render(<Avatar alt={altText} src="/avatar.png" />);
    expect(container).toMatchSnapshot();
  });
});
