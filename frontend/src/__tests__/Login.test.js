import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom"; // Import jest-dom matchers
import { MemoryRouter } from "react-router-dom";
import Login from "../pages/login/Login";

// Mock the useLogin hook
jest.mock("../hooks/useLogin", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("Login Component", () => {
  let mockLogin;
  let useLogin;

  beforeEach(() => {
    // Reset the mock implementation before each test
    mockLogin = jest.fn();
    useLogin = require("../hooks/useLogin").default;
    useLogin.mockReturnValue({
      loading: false,
      login: mockLogin,
    });
  });

  it("renders the login form with all fields and a button", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Assert that input fields and button are present
    expect(screen.getByPlaceholderText("Enter username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("calls the login function when the form is submitted", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Simulate user input
    fireEvent.change(screen.getByPlaceholderText("Enter username"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter Password"), {
      target: { value: "password123" },
    });

    // Simulate form submission
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    // Assert that the login function was called with correct arguments
    expect(mockLogin).toHaveBeenCalledWith("testuser", "password123");
  });

  it("disables the login button when loading", () => {
    // Simulate loading state
    useLogin.mockReturnValue({
      loading: true,
      login: mockLogin,
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Assert that the button is disabled
    const button = screen.getByRole("button", { name: "" }); // Fallback to an empty name due to spinner
    expect(button).toBeDisabled();
  });
});
