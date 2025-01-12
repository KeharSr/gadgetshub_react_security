// importing

import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import Register from "./Register";
import { registerUserApi } from "../../apis/Api";
import { toast } from "react-toastify";
import { BrowserRouter } from "react-router-dom";

// mock api js
jest.mock("../../apis/Api");

//describe block
describe("Register Component Test", () => {
  // Clear all the mock data
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Define the test 1
  it("should show error message on failed registration", async () => {
    // rendering Register component
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    // Toast error

    // Mocking the registerUserApi function
    const mockedData = {
      data: {
        success: false,
        message: "Invalid Password",
      },
    };
    // config mock resloved value
    registerUserApi.mockResolvedValue(mockedData);

    // Config that toast error message as a test function
    toast.error = jest.fn();

    // Testing real UI components
    // Finding email, password, login button
    const firstname = screen.getByPlaceholderText("First Name");
    const lastname = screen.getByPlaceholderText("Last Name");

    const email = screen.getByPlaceholderText("Email");
    const phone = screen.getByPlaceholderText("Phone Number");
    const password = screen.getByPlaceholderText("Password");
    const confirmPassword = screen.getByPlaceholderText("Confirm Password");
    const registerButton = screen.getByRole("button", { name: "Register" } );


    // Simulating user input and interaction
    fireEvent.change(firstname, { target: { value: "user" } });
    fireEvent.change(lastname, { target: { value: "user" } });
    fireEvent.change(email, { target: { value: "user@gmail.com" } });
    fireEvent.change(phone, { target: { value: "9843712332" } });
    fireEvent.change(password, { target: { value: "password" } });
    fireEvent.change(confirmPassword, { target: { value: "password" } });
    fireEvent.click(registerButton);
    });
});
