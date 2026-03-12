import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Exp9 from "./Exp-9";

describe("Experiment 9 Component Test", () => {

  test("renders product list", () => {
    render(<Exp9 />);
    expect(screen.getByText("Product List")).toBeInTheDocument();
  });

  test("adds product to cart", () => {
    render(<Exp9 />);

    const button = screen.getAllByText("Add to Cart")[0];
    fireEvent.click(button);

    expect(screen.getByText(/Items in Cart:/)).toBeInTheDocument();
  });

});