import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

describe("App Routing Test", () => {

  test("renders homepage message", () => {
    render(<App />);

    const text = screen.getByText("Select an Experiment from the Navbar");
    expect(text).toBeInTheDocument();
  });

});