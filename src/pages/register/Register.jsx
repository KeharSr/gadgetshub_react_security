import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import {
  registerUserApi,
  verifyRegistrationOTPApi,
  resendRegistrationOTPApi,
} from "../../apis/Api";
import {
  User,
  Mail,
  Phone,
  Lock,
  UserCircle,
  Eye,
  EyeOff,
  Smartphone,
  Headphones,
  Bluetooth,
  Battery,
  Wifi,
} from "lucide-react";

function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  // OTP states
  const [showOTPForm, setShowOTPForm] = useState(false);
  const [otp, setOTP] = useState("");
  const [otpError, setOTPError] = useState("");
  const [registrationEmail, setRegistrationEmail] = useState("");

  // Password visibility states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = useCallback(
    (field) => (e) => {
      const value = e.target.value;
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
      // Clear error when user starts typing
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    },
    []
  );

  const validateForm = useCallback(() => {
    const newErrors = {};
    let isValid = true;

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First Name is required";
      isValid = false;
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last Name is required";
      isValid = false;
    }
    if (!formData.userName.trim()) {
      newErrors.userName = "Username is required";
      isValid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Number is required";
      isValid = false;
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    }
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm Password is required";
      isValid = false;
    } else if (formData.password.trim() !== formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  }, [formData]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!validateForm()) return;

      const data = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        userName: formData.userName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
      };

      registerUserApi(data)
        .then((res) => {
          if (res.data.success === false) {
            toast.error(res.data.message);
          } else {
            toast.success("Registration successful! Please verify your email.");
            setRegistrationEmail(formData.email);
            setShowOTPForm(true);
          }
        })
        .catch((error) => {
          if (error.response?.data?.message) {
            toast.error(error.response.data.message);
          } else {
            toast.error("Registration failed. Please try again.");
          }
        });
    },
    [formData, validateForm]
  );

  const handleOTPVerification = useCallback(() => {
    if (!otp) {
      setOTPError("Please enter the OTP");
      return;
    }

    verifyRegistrationOTPApi({ email: registrationEmail, otp })
      .then((res) => {
        if (res.data.success) {
          toast.success("Email verified successfully!");
          window.location.href = "/login";
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((error) => {
        if (error.response?.data?.message) {
          toast.error(error.response.data.message);
        } else {
          toast.error("OTP verification failed. Please try again.");
        }
      });
  }, [otp, registrationEmail]);

  const handleResendOTP = useCallback(() => {
    resendRegistrationOTPApi({ email: registrationEmail })
      .then((res) => {
        if (res.data.success) {
          toast.success("OTP resent successfully!");
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((error) => {
        toast.error("Failed to resend OTP. Please try again.");
      });
  }, [registrationEmail]);

  const InputField = useCallback(
    ({
      icon: Icon,
      type,
      placeholder,
      value,
      onChange,
      error,
      isPassword,
      showPassword,
      onTogglePassword,
      name,
    }) => (
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-blue-400" />
        </div>
        <input
          type={isPassword ? (showPassword ? "text" : "password") : type}
          className={`w-full pl-10 ${isPassword ? "pr-10" : "pr-4"} py-3 
        bg-gray-800/50 border ${error ? "border-red-500" : "border-gray-700"} 
        rounded-xl text-gray-300 placeholder-gray-500
        focus:ring-2 focus:ring-blue-500 focus:border-transparent 
        backdrop-blur-sm transition-all duration-300`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
          autoComplete="new-password"
          style={{ caretColor: "white" }}
        />
        {isPassword && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={onTogglePassword}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-300" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400 hover:text-gray-300" />
            )}
          </button>
        )}
        {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
      </div>
    ),
    []
  );

  const OTPInput = useCallback(
    ({ otp, setOTP, error, onSubmit, onResend }) => (
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="p-4 bg-blue-500/10 rounded-full w-fit mx-auto mb-4">
            <Mail className="h-12 w-12 text-blue-400" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Verify Your Email
          </h2>
          <p className="text-gray-400">
            We've sent a verification code to {registrationEmail}
          </p>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              className={`w-full px-4 py-3 text-center text-2xl tracking-widest 
            bg-gray-800/50 border ${
              error ? "border-red-500" : "border-gray-700"
            }
            rounded-xl text-gray-300 placeholder-gray-500
            focus:ring-2 focus:ring-blue-500 focus:border-transparent 
            backdrop-blur-sm transition-all duration-300`}
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOTP(e.target.value)}
              maxLength="6"
              autoComplete="off"
            />
            {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onSubmit}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl
          hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium"
          >
            Verify OTP
          </motion.button>

          <div className="text-center mt-4">
            <button
              onClick={onResend}
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              Didn't receive the code? Resend
            </button>
          </div>
        </div>
      </div>
    ),
    [registrationEmail]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <Toaster />

      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/4 -left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Floating Tech Icons */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-20 left-10 opacity-20"
      >
        <Headphones className="h-16 w-16 text-blue-400" />
      </motion.div>
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-40 right-10 opacity-20"
      >
        <Smartphone className="h-20 w-20 text-purple-400" />
      </motion.div>

      <div className="max-w-6xl mx-auto">
        <div className="backdrop-blur-xl bg-gray-800/50 rounded-2xl border border-gray-700 shadow-2xl overflow-hidden flex flex-col md:flex-row">
          {/* Form Section */}
          <div className="w-full md:w-1/2 p-8 lg:p-12">
            {!showOTPForm ? (
              <>
                <div className="text-center mb-8">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-blue-500/10 rounded-full">
                      <UserCircle className="h-12 w-12 text-blue-400" />
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    Join TechHub
                  </h2>
                  <p className="text-gray-400">
                    Experience premium audio and cutting-edge mobile technology
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                      icon={User}
                      type="text"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleInputChange("firstName")}
                      error={errors.firstName}
                      name="firstName"
                    />
                    <InputField
                      icon={User}
                      type="text"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleInputChange("lastName")}
                      error={errors.lastName}
                      name="lastName"
                    />
                  </div>

                  <InputField
                    icon={UserCircle}
                    type="text"
                    placeholder="Username"
                    value={formData.userName}
                    onChange={handleInputChange("userName")}
                    error={errors.userName}
                    name="userName"
                  />

                  <InputField
                    icon={Mail}
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange("email")}
                    error={errors.email}
                    name="email"
                  />

                  <InputField
                    icon={Phone}
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
                    onChange={handleInputChange("phoneNumber")}
                    error={errors.phoneNumber}
                    name="phoneNumber"
                  />

                  <InputField
                    icon={Lock}
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange("password")}
                    error={errors.password}
                    isPassword={true}
                    showPassword={showPassword}
                    onTogglePassword={() => setShowPassword(!showPassword)}
                    name="password"
                  />

                  <InputField
                    icon={Lock}
                    type="password"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange("confirmPassword")}
                    error={errors.confirmPassword}
                    isPassword={true}
                    showPassword={showConfirmPassword}
                    onTogglePassword={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    name="confirmPassword"
                  />

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl
                    hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium"
                  >
                    Create Account
                  </motion.button>
                </form>
              </>
            ) : (
              <OTPInput
                otp={otp}
                setOTP={setOTP}
                error={otpError}
                onSubmit={handleOTPVerification}
                onResend={handleResendOTP}
              />
            )}
            <div className="mt-8 text-center">
              <p className="text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>

          {/* Feature Section */}
          <div className="hidden md:block w-1/2 relative bg-gradient-to-br from-gray-900 to-gray-800 p-12">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm" />
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-white">
              <div className="p-4 bg-blue-500/10 rounded-full mb-8">
                <Headphones className="h-16 w-16 text-blue-400" />
              </div>
              <h3 className="text-3xl font-bold mb-4">
                Premium Tech Experience
              </h3>
              <p className="text-lg text-gray-300 text-center mb-12">
                Join our community of tech enthusiasts and explore the future of
                audio and mobile technology
              </p>

              <div className="grid grid-cols-2 gap-6 w-full max-w-md">
                <div className="p-4 bg-gray-800/50 rounded-xl backdrop-blur-sm border border-gray-700">
                  <div className="flex items-center space-x-3">
                    <Battery className="w-6 h-6 text-blue-400" />
                    <div>
                      <p className="font-medium text-white">40Hr Battery</p>
                      <p className="text-sm text-gray-400">
                        Long-lasting power
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-gray-800/50 rounded-xl backdrop-blur-sm border border-gray-700">
                  <div className="flex items-center space-x-3">
                    <Bluetooth className="w-6 h-6 text-purple-400" />
                    <div>
                      <p className="font-medium text-white">Bluetooth 5.2</p>
                      <p className="text-sm text-gray-400">
                        Seamless connection
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-gray-800/50 rounded-xl backdrop-blur-sm border border-gray-700">
                  <div className="flex items-center space-x-3">
                    <Wifi className="w-6 h-6 text-green-400" />
                    <div>
                      <p className="font-medium text-white">5G Ready</p>
                      <p className="text-sm text-gray-400">Lightning fast</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-gray-800/50 rounded-xl backdrop-blur-sm border border-gray-700">
                  <div className="flex items-center space-x-3">
                    <Smartphone className="w-6 h-6 text-yellow-400" />
                    <div>
                      <p className="font-medium text-white">Latest Tech</p>
                      <p className="text-sm text-gray-400">Cutting edge</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
