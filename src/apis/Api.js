import axios from "axios";
import toast from "react-hot-toast";

// Creating backend Config!
const Api = axios.create({
  baseURL: "https://localhost:5000",
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

const config2 = {
  headers: {
    authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  },
};

const config = {
  headers: {
    authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

// Axios Interceptor to Handle Rate Limiting and Errors
Api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 429) {
        // Handle rate-limiting error
        toast.error(
          error.response.data.message || "Too many requests from this IP, please try again after 15 minutes"
        );
      } else {
        // Handle other server-side errors
        toast.error(
          error.response.data.message || "Something went wrong. Please try again."
        );
      }
    } else {
      // Handle network errors
      toast.error("Network error. Unable to connect to the server.");
    }
    return Promise.reject(error);
  }
);

// Other APIs (unchanged but using the same interceptor logic for all requests)

// Test API
export const testApi = () => Api.get("/test");

//=========================== Auth Apis ===========================

// Register Api
export const registerUserApi = (data) => Api.post("/api/user/create", data);

// Modified Login Api to handle OTP
export const loginUserApi = (data) => {
  if (data.otp) {
    return Api.post("/api/user/login", data);
  }
  return Api.post("/api/user/login", data);
};

// Fetch Activity Logs
export const fetchActivityLogsApi = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(
    "https://localhost:5000/api/logs/activity-logs",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.logs;
};

// Password APIs
export const updatePasswordApi = (data) =>
  Api.post("/api/user/update-password", data);

// Registration Email Verification OTP
export const verifyRegistrationOTPApi = (data) =>
  Api.post("/api/user/verify-email", data);

// Resend Registration OTP
export const resendRegistrationOTPApi = (data) =>
  Api.post("/api/user/resend-registration-otp", data);

// Verify Login OTP
export const verifyLoginOTPApi = (data) =>
  Api.post("/api/user/verify-login-otp", data);

// Resend Login OTP
export const resendLoginOTPApi = (data) =>
  Api.post("/api/user/resend-login-otp", data);

// Current User APIs
export const getCurrentUserApi = () => Api.get("/api/user/current", config);
export const editUserProfileApi = (data) =>
  Api.put("/api/user/update", data, config);

export const uploadProfilePictureApi = (data) =>
  Api.post("/api/user/profile_picture", data,config);

// Forgot Password
export const forgotPasswordApi = (data) =>
  Api.post("/api/user/forgot_password", data);

// Get Password History
export const getPasswordHistoryApi = (data) =>
  Api.post("/api/user/get-password-history", data);

// Verify OTP
export const verifyOtpApi = (data) => Api.post("/api/user/verify_otp", data);


//=========================== Product Apis ===========================

// Create Product Api
export const createProductApi = (data) =>
  Api.post("/api/product/create", data, config);
export const getAllProductsApi = () =>
  Api.get("/api/product/get_all_products", config);
export const updateProduct = (id, data) =>
  Api.put(`/api/product/update_product/${id}`, data, config);
export const deleteProduct = (id) =>
  Api.delete(`/api/product/delete_product/${id}`, config);
export const getSingleProductApi = (id) =>
  Api.get(`/api/product/get_single_product/${id}`, config);
export const getProductsByCategoryApi = (category, page, limit = 2) =>
  Api.get(
    `/api/product/get_products_by_category?category=${category}&page=${page}&limit=${limit}`,
    config
  );

//=========================== Cart Apis ===========================

export const addToCartApi = (data) =>
  Api.post("/api/cart/add_to_cart", data, config);
export const getCartApi = () => Api.get("/api/cart/get_cart", config);
export const deleteCartItemApi = (id) =>
  Api.delete(`/api/cart/remove_cart_item/${id}`, config);
export const updateStatusApi = () =>
  Api.put(`/api/cart/update_status`, "", config);
export const updateCartItemApi = (data) =>
  Api.put(`/api/cart/update_cart`, data, config);

//=========================== Order Apis ===========================

export const placeOrderApi = (data) =>
  Api.post("/api/order/place_order", data, config2);
export const getSingleOrderApi = (id) =>
  Api.get(`/api/order/get_single_order/${id}`, config);
export const getAllOrdersApi = () =>
  Api.get("/api/order/get_all_orders", config);
export const updateOrderStatusApi = (id, data) =>
  Api.post(`/api/order/update_order_status/${id}`, data, config2);
export const getOrdersByUserApi = () =>
  Api.get("/api/order/get_orders_by_user", config);

//=========================== Review Apis ===========================

export const addReviewApi = (data) =>
  Api.post("/api/review/post_reviews", data, config);
export const getReviewsApi = (ProductId) =>
  Api.get(`/api/review/get_reviews/${ProductId}`, config);
export const getReviewsByProductAndUserApi = (ProductId) =>
  Api.get(`/api/review/get_reviews_by_user_and_product/${ProductId}`, config);
export const getAverageRatingApi = (ProductId) =>
  Api.get(`/api/review/get_average_rating/${ProductId}`, config);
export const updateReviewApi = (productId, data) =>
  Api.put(`/api/review/update_reviews/${productId}`, data, config);

//=========================== Favourites Apis ===========================

export const addFavouriteApi = (data) =>
  Api.post("/api/favourite/add_favourite", data, config);
export const getFavouritesApi = () =>
  Api.get("/api/favourite/get_favourite", config);
export const deleteFavouriteApi = (id) =>
  Api.delete(`/api/favourite/remove_favourite/${id}`, config);

//=========================== Payment APIs ===========================

export const createPaymentApi = (data) =>
  Api.post(`/api/payment/add`, data, config2);
const KhaltiApi = axios.create({
  baseURL: "https://test-pay.khalti.com/",
  headers: {
    "Content-Type": "application/json",
    authorization: `key test_public_key_38acaf5cadbe41e781e13d35f19509f4`,
  },
});
export const initiateKhaltiPayment = (data) =>
  KhaltiApi.post("api/v2/epayment/initiate/", data, config);
export const initializeKhaltiPaymentApi = (data) =>
  Api.post("api/khalti/initialize-khalti", data, config);
export const verifyKhaltiPaymentApi = (params) =>
  Api.get("/api/khalti/complete-khalti-payment", { params }, config);

export default Api;
