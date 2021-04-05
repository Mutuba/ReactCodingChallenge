import React from "react";
import { render, cleanup, screen } from "@testing-library/react";
import App from "../App";
afterEach(cleanup);

it("render app loading status", () => {
  render(<App />);
  expect(screen.getAllByText("Loading")).toBeTruthy();
});
