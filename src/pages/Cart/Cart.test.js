// src/pages/cart/Cart.test.js
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Cart from "./Cart";
import {
  getCartApi,
  updateCartItemApi,
  getCurrentUserApi,
} from "../../apis/Api";
import cartMockData from "../../__mock__/cartMockData";
import { BrowserRouter } from "react-router-dom";

// Mock the API
jest.mock("../../apis/Api");

// Mock toast
jest.mock("react-hot-toast", () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

describe("Cart Component Test", () => {
  beforeEach(() => {
    // Mock getCurrentUserApi to simulate a logged-in user
    getCurrentUserApi.mockResolvedValue({
      status: 200,
      data: { user: { firstName: "Test", lastName: "User" } },
    });

    // Mock localStorage for user data
    localStorage.setItem(
      "user",
      JSON.stringify({ firstName: "Test", lastName: "User" })
    );

    jest.clearAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it("should display cart items if API call is successful", async () => {
    getCartApi.mockResolvedValue({
      status: 200,
      data: cartMockData,
    });

    render(
      <BrowserRouter>
        <Cart />
      </BrowserRouter>
    );

    await waitFor(() => {
      cartMockData.products.forEach((item) => {
        expect(
          screen.getByText(item.productId.productName)
        ).toBeInTheDocument();
        expect(
          screen.getByText(
            `Price: Rs. ${item.productId.productPrice.toFixed(2)}`
          )
        ).toBeInTheDocument();
      });

      const prices = screen.getAllByText(`Rs. 200.00`);
      expect(prices).toHaveLength(2); // Assuming two items with the same price
    });
  });

  it("should handle quantity change", async () => {
    getCartApi.mockResolvedValue({
      status: 200,
      data: cartMockData,
    });

    updateCartItemApi.mockResolvedValue({
      status: 200,
      data: {
        success: true,
      },
    });

    render(
      <BrowserRouter>
        <Cart />
      </BrowserRouter>
    );

    await waitFor(() => {
      const increaseButtons = screen.getAllByLabelText("Increase quantity");
      expect(increaseButtons).toHaveLength(cartMockData.products.length);

      fireEvent.click(increaseButtons[0]);
      expect(updateCartItemApi).toHaveBeenCalled();
    });
  });
});
