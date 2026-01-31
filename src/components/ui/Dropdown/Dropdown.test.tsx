import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Dropdown } from "./Dropdown";
import styles from "./Dropdown.module.scss";
import { DropdownContent } from "./DropdownContent";
import { DropdownItem } from "./DropdownItem";
import { DropdownLabel } from "./DropdownLabel";
import { DropdownSeparator } from "./DropdownSeparator";
import { DropdownTrigger } from "./DropdownTrigger";

describe("Dropdown Components", () => {
  function renderDropdown() {
    return render(
      <Dropdown>
        <DropdownTrigger>Open Menu</DropdownTrigger>

        <DropdownContent>
          <DropdownLabel>Actions</DropdownLabel>

          <DropdownItem>Item One</DropdownItem>
          <DropdownItem selected>Item Two</DropdownItem>
          <DropdownItem disabled>Item Three</DropdownItem>

          <DropdownSeparator />
        </DropdownContent>
      </Dropdown>,
    );
  }

  it("renders trigger", () => {
    renderDropdown();
    expect(screen.getByText("Open Menu")).toBeInTheDocument();
  });

  it("applies trigger class", () => {
    renderDropdown();
    expect(screen.getByText("Open Menu")).toHaveClass(styles.dropdownTrigger);
  });

  it("opens dropdown on click", async () => {
    const user = userEvent.setup();
    renderDropdown();

    await user.click(screen.getByText("Open Menu"));

    expect(await screen.findByText("Actions")).toBeInTheDocument();
  });

  it("renders label", async () => {
    const user = userEvent.setup();
    renderDropdown();

    await user.click(screen.getByText("Open Menu"));

    const label = await screen.findByText("Actions");
    expect(label).toHaveClass(styles.dropdownLabel);
  });

  it("renders items", async () => {
    const user = userEvent.setup();
    renderDropdown();

    await user.click(screen.getByText("Open Menu"));

    expect(screen.getByText("Item One")).toBeInTheDocument();
    expect(screen.getByText("Item Two")).toBeInTheDocument();
  });

  it("applies selected item class", async () => {
    const user = userEvent.setup();
    renderDropdown();

    await user.click(screen.getByText("Open Menu"));

    const selected = screen.getByText("Item Two");
    expect(selected).toHaveClass(styles.dropdownItemSelected);
  });

  it("applies disabled class", async () => {
    const user = userEvent.setup();
    renderDropdown();

    await user.click(screen.getByText("Open Menu"));

    const disabled = screen.getByText("Item Three");
    expect(disabled).toHaveClass(styles.dropdownItemDisabled);
  });

  it("fires onSelect when item clicked", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();

    render(
      <Dropdown>
        <DropdownTrigger>Open</DropdownTrigger>
        <DropdownContent>
          <DropdownItem onSelect={onSelect}>Click Me</DropdownItem>
        </DropdownContent>
      </Dropdown>,
    );

    await user.click(screen.getByText("Open"));
    await user.click(await screen.findByText("Click Me"));

    expect(onSelect).toHaveBeenCalled();
  });

  it("renders separator", async () => {
    const user = userEvent.setup();
    renderDropdown();

    await user.click(screen.getByText("Open Menu"));

    const sep = document.querySelector(`.${styles.dropdownSeparator}`);
    expect(sep).toBeInTheDocument();
  });

  it("closes after selecting item", async () => {
    const user = userEvent.setup();
    renderDropdown();

    await user.click(screen.getByText("Open Menu"));
    await user.click(await screen.findByText("Item One"));

    expect(screen.queryByText("Actions")).not.toBeInTheDocument();
  });
});
