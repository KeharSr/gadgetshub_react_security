import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Toaster } from "react-hot-toast";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import HomePage from "./pages/homepage/HomePage";
import Onboarding from "./pages/onboarding/Onboarding";
import AdminPage from "./pages/admin/AdminPage";
import AdminRoutes from "./protected_routes/AdminRoutes";
import UserRoutes from "./protected_routes/UserRoutes";
import Addtocart from "./pages/Cart/Cart";
import ProductDetails from "./pages/product_details/ProductDetails";
import PlaceOrder from "./pages/placeorder/PlaceOrder";
import ForgetPassword from "./pages/forget_password/ForgetPassword";
import MyOrders from "./pages/my_order/MyOrder";
import Favorites from "./pages/favourites/Favourites";
import EditProfile from "./pages/edit_profile/Edit_Profile";
import EditAdminProfile from "./pages/admin/EditProfile";
import EarBuds from "./pages/gadgets/EarBuds";
import MobilePhones from "./pages/gadgets/MobilePhones";
import PaymentVerification from "./pages/payment_success";
import ActivityLog from "./pages/admin/ActivityLogs";

function App() {
  return (
    <Router>
      <Toaster />
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Protected Routes */}
        <Route element={<AdminRoutes />}>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/adminprofile" element={<EditAdminProfile />} />
          <Route path="/logs" element={<ActivityLog/>} />
          {/* <Route path='/add-product' element={<AddProduct />} /> */}
        </Route>

        {/* User Protected Routes */}
        <Route element={<UserRoutes />}>
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/addtocart" element={<Addtocart />} />
          <Route path="/EarBuds" element={<EarBuds />} />
          <Route path="/Mobilephones" element={<MobilePhones />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/placeorder/:cart" element={<PlaceOrder />} />
          <Route path="/myorder" element={<MyOrders />} />
          <Route path="/favourites" element={<Favorites />} />
          <Route path="/profile" element={<EditProfile />} />
          <Route path="/payment-success" element={< PaymentVerification/>} />

        </Route>
        <Route path="/forgetpassword" element={<ForgetPassword />} />
      </Routes>
    </Router>
  );
}
export default App;
