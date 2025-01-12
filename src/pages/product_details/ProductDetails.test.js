import React from "react";
import { render, screen, waitFor, fireEvent, act } from "@testing-library/react";
import ProductDetails from "./ProductDetails";
import {
  getSingleProductApi,
  addToCartApi,
  addReviewApi,
  getReviewsApi,
  getReviewsByProductAndUserApi,
  getAverageRatingApi,
  getCurrentUserApi,
} from "../../apis/Api";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Modal from "react-modal";
import * as ReactHotToast from "react-hot-toast";
import productMockData from "../../__mock__/productMockData";
import reviewsMockData from "../../__mock__/reviewsMockData";

// Mock the API
jest.mock("../../apis/Api");

// Mock toast
jest.mock("react-hot-toast");

describe("ProductDetails Component Test", () => {
  beforeEach(() => {
    // Set up #root element in the DOM
    const root = document.createElement("div");
    root.setAttribute("id", "root");
    document.body.appendChild(root);
    Modal.setAppElement(root);

    // Mock API responses
    getSingleProductApi.mockResolvedValue({
      status: 200,
      data: { product: productMockData[0] },
    });
    getReviewsApi.mockResolvedValue({
      status: 200,
      data: { reviews: reviewsMockData },
    });
    getReviewsByProductAndUserApi.mockResolvedValue({
      status: 200,
      data: { review: null },
    });
    getAverageRatingApi.mockResolvedValue({
      status: 200,
      data: { averageRating: 4.5, productId: productMockData[0]._id },
    });
    getCurrentUserApi.mockResolvedValue({
      status: 200,
      data: { user: { name: "Test User" } },
    });

    // Clear toast mocks
    ReactHotToast.toast.success.mockClear();
    ReactHotToast.toast.error.mockClear();
  });

  afterEach(() => {
    jest.clearAllMocks();

    // Clean up #root element from the DOM
    const root = document.getElementById("root");
    if (root) {
      document.body.removeChild(root);
    }
  });

  it("should display product details", async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/product/1"]}>
          <Routes>
            <Route path="/product/:id" element={<ProductDetails />} />
          </Routes>
        </MemoryRouter>
      );
    });

    await waitFor(() => {
      expect(screen.getByText(productMockData[0].productName)).toBeInTheDocument();
      expect(screen.getByText(`$${productMockData[0].productPrice.toFixed(2)}`)).toBeInTheDocument();
      expect(screen.getByText(productMockData[0].productDescription)).toBeInTheDocument();
      expect(screen.getByText(productMockData[0].productCategory)).toBeInTheDocument();
    });
  });

  it("should add product to cart", async () => {
    addToCartApi.mockResolvedValue({
      status: 201,
      data: { message: "Product added to cart" },
    });

    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/product/1"]}>
          <Routes>
            <Route path="/product/:id" element={<ProductDetails />} />
          </Routes>
        </MemoryRouter>
      );
    });

    fireEvent.click(screen.getByText(/add to cart/i));

    await waitFor(() => {
      expect(addToCartApi).toHaveBeenCalledWith({ productId: productMockData[0]._id, quantity: 1 });
    });

    await waitFor(() => {
      expect(ReactHotToast.toast.success).toHaveBeenCalledWith("Product added to cart");
    });
  });

  it("should submit a review", async () => {
    addReviewApi.mockResolvedValue({
      status: 201,
      data: { message: "Review added successfully" },
    });

    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/product/1"]}>
          <Routes>
            <Route path="/product/:id" element={<ProductDetails />} />
          </Routes>
        </MemoryRouter>
      );
    });

    fireEvent.click(screen.getByText(/write a review/i));

    const starButtons = screen.getAllByLabelText(/Rating \d/i);
    fireEvent.click(starButtons[4]);

    fireEvent.change(screen.getByPlaceholderText(/share your thoughts/i), {
      target: { value: "Great product!" },
    });
    fireEvent.click(screen.getByRole("button", { name: /submit review/i }));

    await waitFor(() => {
      expect(addReviewApi).toHaveBeenCalledWith({ productId: productMockData[0]._id, rating: 5, review: "Great product!" });
    });

    await waitFor(() => {
      expect(ReactHotToast.toast.success).toHaveBeenCalledWith("Review added successfully");
    });
  });
});
