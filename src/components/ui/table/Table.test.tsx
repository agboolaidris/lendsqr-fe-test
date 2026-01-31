import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { TableFooter } from "./TableFooter";

describe("TableFooter", () => {
  it("renders showing text and range", () => {
    render(
      <TableFooter
        totalItems={100}
        pageCount={10}
        currentPage={2}
        pageSize={10}
      />,
    );

    expect(screen.getByText(/Showing/i)).toBeInTheDocument();
    expect(screen.getByText(/\(11-20 of 100\)/)).toBeInTheDocument();
  });

  it("calls onPageChange", async () => {
    const user = userEvent.setup();
    const fn = vi.fn();

    render(
      <TableFooter
        totalItems={100}
        pageCount={10}
        currentPage={1}
        onPageChange={fn}
      />,
    );

    await user.click(screen.getByLabelText("Go to page 2"));
    expect(fn).toHaveBeenCalledWith(2);
  });

  it("calls onPageSizeChange", async () => {
    const user = userEvent.setup();
    const sizeFn = vi.fn();
    const pageFn = vi.fn();

    render(
      <TableFooter
        totalItems={100}
        onPageSizeChange={sizeFn}
        onPageChange={pageFn}
      />,
    );

    await user.selectOptions(screen.getByLabelText("Select page size"), "20");

    expect(sizeFn).toHaveBeenCalledWith(20);
    expect(pageFn).toHaveBeenCalledWith(1);
  });

  it("disables buttons when disabled=true", () => {
    render(<TableFooter totalItems={100} pageCount={5} disabled />);

    expect(screen.getByLabelText("Next page")).toBeDisabled();
  });

  it("renders ellipsis when many pages", () => {
    render(<TableFooter totalItems={1000} pageCount={50} currentPage={25} />);

    expect(screen.getAllByText("...").length).toBeGreaterThan(0);
  });

  it("hides pagination when pageCount <= 1", () => {
    render(<TableFooter pageCount={1} />);
    expect(screen.queryByLabelText("Next page")).not.toBeInTheDocument();
  });
});
