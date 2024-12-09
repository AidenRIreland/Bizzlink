import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import AccountUpdate from "../pages/AccountUpdate";
import { useAuthContext } from "../context/AuthContext";
import fetchMock from "jest-fetch-mock";

jest.mock("../context/AuthContext", () => ({
  useAuthContext: jest.fn(),
}));

jest.mock("react-hot-toast", () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("AccountUpdate Component", () => {
  const mockAuthUser = {
    fullName: "John Doe",
    username: "johndoe",
    profilePic: "http://example.com/profile.jpg",
  };
  const mockSetAuthUser = jest.fn();

  beforeEach(() => {
    fetchMock.resetMocks();
    useAuthContext.mockReturnValue({
      authUser: mockAuthUser,
      setAuthUser: mockSetAuthUser,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the form with pre-filled user data", () => {
    render(
      <MemoryRouter>
        <AccountUpdate />
      </MemoryRouter>
    );

    expect(screen.getByDisplayValue("John Doe")).toBeInTheDocument();
    expect(screen.getByDisplayValue("johndoe")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /update profile/i })).toBeInTheDocument();
  });

  it("disables the submit button while loading", async () => {
    render(
      <MemoryRouter>
        <AccountUpdate />
      </MemoryRouter>
    );

    const button = screen.getByRole("button", { name: /update profile/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(button).toBeDisabled();
      expect(button).toHaveTextContent(/updating.../i);
    });
  });

  it("submits the form and updates the profile successfully", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({ fullName: "Jane Doe", username: "janedoe" })
    );

    render(
      <MemoryRouter>
        <AccountUpdate />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByDisplayValue("John Doe"), {
      target: { value: "Jane Doe" },
    });
    fireEvent.change(screen.getByDisplayValue("johndoe"), {
      target: { value: "janedoe" },
    });
    fireEvent.click(screen.getByRole("button", { name: /update profile/i }));

    await waitFor(() => {
      expect(mockSetAuthUser).toHaveBeenCalledWith({
        fullName: "Jane Doe",
        username: "janedoe",
      });
      expect(mockNavigate).toHaveBeenCalledWith("/myaccount");
    });
  });
});
