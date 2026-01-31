import { render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { type AuthContextType, useAuth } from "src/context/AuthContext";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { AuthGuard } from "./AuthGuard";

vi.mock("src/context/AuthContext");
vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

describe("AuthGuard", () => {
  const push = vi.fn();

  const mockedUseAuth = vi.mocked(useAuth);
  const mockedUseRouter = vi.mocked(useRouter);

  // ✅ strongly typed mock factory
  const createAuthMock = (
    override: Partial<AuthContextType>,
  ): AuthContextType => ({
    user: null,
    loading: false,
    login: vi.fn(),
    logout: vi.fn(),
    ...override,
  });

  beforeEach(() => {
    vi.clearAllMocks();
    mockedUseRouter.mockReturnValue({ push } as unknown as ReturnType<
      typeof useRouter
    >);
  });

  it("renders loading state when loading is true", () => {
    mockedUseAuth.mockReturnValue(
      createAuthMock({
        loading: true,
        user: null,
      }),
    );

    render(
      <AuthGuard>
        <div>Protected content</div>
      </AuthGuard>,
    );

    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  it("redirects to login if not loading and no user", () => {
    mockedUseAuth.mockReturnValue(
      createAuthMock({
        loading: false,
        user: null,
      }),
    );

    render(
      <AuthGuard>
        <div>Protected content</div>
      </AuthGuard>,
    );

    expect(push).toHaveBeenCalledWith("/login");
  });

  it("renders children if user exists", () => {
    mockedUseAuth.mockReturnValue(
      createAuthMock({
        loading: false,
        user: { id: 1, email: "[EMAIL_ADDRESS]" } as AuthContextType["user"],
      }),
    );

    render(
      <AuthGuard>
        <div>Protected content</div>
      </AuthGuard>,
    );

    expect(screen.getByText("Protected content")).toBeInTheDocument();
  });
});
