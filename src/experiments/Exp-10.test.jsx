import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Exp10 from "./Exp-10";

test("renders Experiment 10 page", () => {
  render(<Exp10 />);
  const textElement = screen.getByText("Experiment 10");
  expect(textElement).toBeInTheDocument();
});