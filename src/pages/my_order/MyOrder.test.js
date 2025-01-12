// src/pages/myorders/MyOrders.test.js
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import MyOrders from "./MyOrder";
import { getOrdersByUserApi } from "../../apis/Api";
import orderMockData from "../../__mock__/orderMockData";
import { BrowserRouter } from "react-router-dom";
import { toast } from "react-hot-toast";

// Mock the API
jest.mock("../../apis/Api");

// Mock toast
jest.mock("react-hot-toast", () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

describe("MyOrders Component Test", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should display loading state initially", async () => {
    render(
      <BrowserRouter>
        <MyOrders />
      </BrowserRouter>
    );

    expect(screen.getByText("Loading orders...")).toBeInTheDocument();
  });

  it("should display error message if API call fails", async () => {
    getOrdersByUserApi.mockRejectedValue(new Error("Error fetching orders"));

    render(
      <BrowserRouter>
        <MyOrders />
      </BrowserRouter>
    );

     waitFor(() => {
      expect(screen.getByText("Error: Error fetching orders. Please try again later.")).toBeInTheDocument();
    });
  });

  it("should display orders if API call is successful", async () => {
    getOrdersByUserApi.mockResolvedValue({
      data: {
        success: true,
        orders: orderMockData,
      },
    });

    render(
      <BrowserRouter>
        <MyOrders />
      </BrowserRouter>
    );

     waitFor(() => {
      orderMockData.forEach((order) => {
        expect(screen.getByText(`Order #${order._id.slice(-6)}`)).toBeInTheDocument();
        expect(screen.getByText(order.status)).toBeInTheDocument();
        expect(screen.getByText(`Total: $${order.total.toFixed(2)}`)).toBeInTheDocument();
      });
    });
  });

  it("should expand order details on click", async () => {
    getOrdersByUserApi.mockResolvedValue({
      data: {
        success: true,
        orders: orderMockData,
      },
    });

    render(
      <BrowserRouter>
        <MyOrders />
      </BrowserRouter>
    );

     waitFor(() => {
      const orderElement = screen.getByText(`Order #${orderMockData[0]._id.slice(-6)}`);
      fireEvent.click(orderElement);
      orderMockData[0].products.forEach((product) => {
        expect(screen.getByText(`${product.productId.productName} x ${product.quantity}`)).toBeInTheDocument();
      });
    });
  });

  it("should handle track order", async () => {
    getOrdersByUserApi.mockResolvedValue({
      data: {
        success: true,
        orders: orderMockData,
      },
    });

  });
});
