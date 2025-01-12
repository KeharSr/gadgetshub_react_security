// src/pages/homepage/HomePage.test.js
import { render, screen, waitFor } from "@testing-library/react";
import Homepage from "./HomePage";
import { getAllProductsApi, getCurrentUserApi } from "../../apis/Api";
import productMockData from "../../__mock__/productMockData";
import { BrowserRouter } from "react-router-dom";

// Mock the API
jest.mock("../../apis/Api");

describe("Homepage Component Test", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should display all products on the homepage', async () => {
    // Mock API responses
    getAllProductsApi.mockResolvedValue({
      data: {
        products: productMockData
      }
    });

    getCurrentUserApi.mockResolvedValue({
      data: {
        user: {
          name: "Test User"
        }
      }
    });

    render(
      <BrowserRouter>
        <Homepage />
      </BrowserRouter>
    );

    // Wait for the products to be rendered
     waitFor(() => {
      productMockData.forEach((product) => {
        expect(screen.getByText(product.productName)).toBeInTheDocument();
      });
    });

    // Debug the rendered output
    screen.debug();
  });
});
