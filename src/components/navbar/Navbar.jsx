import React, { useState, useEffect } from "react";
import applogo from "../../assets/images/applogo.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, User, Menu, X, Headphones, Smartphone, Package, Heart, LogOut, Settings } from "lucide-react";
import { toast } from "react-hot-toast";
import { getCurrentUserApi } from "../../apis/Api";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  useEffect(() => {
    getCurrentUserApi()
      .then((res) => {
        if (res.status === 200) {
          setUser(res.data.user);
          localStorage.setItem("user", JSON.stringify(res.data.user));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    window.location.href = "/login";
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-gray-900/95 backdrop-blur-lg border-b border-gray-800 shadow-lg" 
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center justify-start">
            <img 
              className="h-12 w-auto" 
              src={applogo} 
              alt="TechStore Logo" 
            />
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            <NavLink to="/homepage">
              <span className="flex items-center space-x-1">
                Home
              </span>
            </NavLink>
            <NavLink to="/Earbuds">
              <span className="flex items-center space-x-1">
                <Headphones className="w-4 h-4" />
                <span>Earbuds</span>
              </span>
            </NavLink>
            <NavLink to="/Mobilephones">
              <span className="flex items-center space-x-1">
                <Smartphone className="w-4 h-4" />
                <span>Phones</span>
              </span>
            </NavLink>
            <NavLink to="/myorder">
              <span className="flex items-center space-x-1">
                <Package className="w-4 h-4" />
                <span>Orders</span>
              </span>
            </NavLink>
            <NavLink to="/favourites">
              <span className="flex items-center space-x-1">
                <Heart className="w-4 h-4" />
                <span>Wishlist</span>
              </span>
            </NavLink>

            <Link
              to="/addtocart"
              className="relative p-2 text-gray-400 hover:text-blue-400 transition-colors duration-200"
            >
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">0</span>
            </Link>

            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors duration-200"
              >
                <User className="w-5 h-5 text-gray-400" />
                <span className="text-gray-300 text-sm font-medium">
                  {user ? user.firstName : "Guest"}
                </span>
              </button>

              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.1 }}
                  className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-xl shadow-xl py-1 border border-gray-700"
                >
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700/50"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Edit Profile</span>
                  </Link>
                  <Link
                    to="/signout"
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700/50"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign out</span>
                  </Link>
                </motion.div>
              )}
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-400 hover:text-gray-300 hover:bg-gray-800 focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="md:hidden bg-gray-900/95 backdrop-blur-lg border-b border-gray-800"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            <NavLink to="/homepage" mobile>
              Home
            </NavLink>
            <NavLink to="/Earbuds" mobile>
              <Headphones className="w-4 h-4 mr-2" />
              Earbuds
            </NavLink>
            <NavLink to="/Mobilephones" mobile>
              <Smartphone className="w-4 h-4 mr-2" />
              Phones
            </NavLink>
            <NavLink to="/myorder" mobile>
              <Package className="w-4 h-4 mr-2" />
              Orders
            </NavLink>
            <NavLink to="/favourites" mobile>
              <Heart className="w-4 h-4 mr-2" />
              Wishlist
            </NavLink>
            <NavLink to="/addtocart" mobile>
              <ShoppingCart className="w-4 h-4 mr-2" />
              Cart
            </NavLink>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

const NavLink = ({ to, children, mobile }) => (
  <Link
    to={to}
    className={`${
      mobile
        ? "flex items-center px-3 py-2 rounded-lg text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800/50"
        : "relative px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200 group"
    }`}
  >
    {children}
    {!mobile && (
      <motion.span 
        className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        layoutId="navunderline"
      />
    )}
  </Link>
);

export default Navbar;