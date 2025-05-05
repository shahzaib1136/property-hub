import { render, screen } from "@testing-library/react";
import Spinner from "./Spinner"; // Adjust the import path

describe("Spinner Component", () => {
  it("should not render when loading is false", () => {
    const { container } = render(<Spinner loading={false} />);
    expect(container.firstChild).toBeNull();
  });

  it("should render the ClipLoader when loading is true", () => {
    render(<Spinner loading={true} />);
    const spinner = screen.getByRole("status1");
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveAttribute("aria-label", "Loading Spinner");
  });

  it("should apply default styles", () => {
    render(<Spinner loading={true} />);
    const spinner = screen.getByRole("status1");

    // Check if default styles are applied
    expect(spinner).toHaveStyle({
      display: "block",
      margin: "100px auto",
    });
  });

  it("should merge custom styles with default styles", () => {
    const customStyle = { margin: "50px auto", backgroundColor: "red" };
    render(<Spinner loading={true} style={customStyle} />);
    const spinner = screen.getByRole("status1");

    expect(spinner).toHaveStyle({
      display: "block", // from default
      margin: "50px auto", // overridden
      backgroundColor: "red", // custom
    });
  });

  it("should render with overlay when overlay prop is true", () => {
    render(<Spinner loading={true} overlay={true} />);

    const overlay = screen.getByTestId("spinner-overlay");
    expect(overlay).toBeInTheDocument();
    expect(overlay).toHaveClass("fixed inset-0");
    expect(overlay).toHaveClass("bg-black bg-opacity-50");

    const spinner = screen.getByRole("status");
    expect(spinner).toBeInTheDocument();
  });

  it("should apply custom className", () => {
    render(<Spinner loading={true} className="custom-class" />);
    const spinner = screen.getByRole("status1");
    expect(spinner).toHaveClass("custom-class");
  });
});
