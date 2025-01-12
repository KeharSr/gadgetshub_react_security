import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddProduct from "./AddProduct";
import { createProductApi } from "../../apis/Api";
import { toast } from "react-hot-toast";

// Mock the API and toast
jest.mock("../../apis/Api");
jest.mock("react-hot-toast", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("AddProduct Component Test", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the AddProduct form", () => {
    render(<AddProduct />);

    expect(screen.getByLabelText(/Product Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Product Category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Product Price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Product Quantity/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Product Description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Upload Image/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Add Product/i })).toBeInTheDocument();
  });

  it("should handle form submission successfully", async () => {
    createProductApi.mockResolvedValue({
      data: { success: true, message: "Product added successfully" },
    });

    render(<AddProduct />);

    fireEvent.change(screen.getByLabelText(/Product Name/i), {
      target: { value: "Test Product" },
    });
    fireEvent.change(screen.getByLabelText(/Product Category/i), {
      target: { value: "Sun Glasses" },
    });
    fireEvent.change(screen.getByLabelText(/Product Price/i), {
      target: { value: "99.99" },
    });
    fireEvent.change(screen.getByLabelText(/Product Quantity/i), {
      target: { value: "10" },
    });
    fireEvent.change(screen.getByLabelText(/Product Description/i), {
      target: { value: "This is a test product" },
    });

    const file = new File(["dummy content"], "example.png", { type: "image/png" });
    fireEvent.change(screen.getByLabelText(/Upload Image/i), {
      target: { files: [file] },
    });

    fireEvent.click(screen.getByRole("button", { name: /Add Product/i }));

    await waitFor(() => {
      expect(createProductApi).toHaveBeenCalledWith(expect.any(FormData));
      expect(toast.success).toHaveBeenCalledWith("Product added successfully");
    });
  });

  it("should handle form submission error", async () => {
    createProductApi.mockRejectedValue({
      response: {
        status: 400,
        data: { message: "Failed to add product" },
      },
    });

    render(<AddProduct />);

    fireEvent.change(screen.getByLabelText(/Product Name/i), {
      target: { value: "Test Product" },
    });
    fireEvent.change(screen.getByLabelText(/Product Category/i), {
      target: { value: "Sun Glasses" },
    });
    fireEvent.change(screen.getByLabelText(/Product Price/i), {
      target: { value: "99.99" },
    });
    fireEvent.change(screen.getByLabelText(/Product Quantity/i), {
      target: { value: "10" },
    });
    fireEvent.change(screen.getByLabelText(/Product Description/i), {
      target: { value: "This is a test product" },
    });

    const file = new File(["dummy content"], "example.png", { type: "image/png" });
    fireEvent.change(screen.getByLabelText(/Upload Image/i), {
      target: { files: [file] },
    });

    fireEvent.click(screen.getByRole("button", { name: /Add Product/i }));

    await waitFor(() => {
      expect(createProductApi).toHaveBeenCalledWith(expect.any(FormData));
      expect(toast.error).toHaveBeenCalledWith("Failed to add product");
    });
  });
});
