import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { Toaster, toast } from "react-hot-toast";
import {
  loginUserApi,
  verifyLoginOTPApi,
  resendLoginOTPApi,
} from "../../apis/Api";
import { Mail, Lock } from "lucide-react";
import loginui from "../../assets/images/loginui.png";

const Login = () => {
  // Original states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [googleToken, setGoogleToken] = useState("");
  const [googleId, setGoogleId] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const [role, setRole] = useState("user");

  // New OTP states
  const [showOTPForm, setShowOTPForm] = useState(false);
  const [otp, setOTP] = useState("");
  const [otpError, setOTPError] = useState("");
  const [loginData, setLoginData] = useState(null);

  const navigate = useNavigate();

  const validation = () => {
    let isValid = true;
    if (email.trim() === "" || !email.includes("@")) {
      setEmailError("Email is empty or invalid");
      isValid = false;
    }
    if (password.trim() === "") {
      setPasswordError("Password is empty");
      isValid = false;
    }
    return isValid;
  };

  // Modified login handler
  const handleLogin = (e) => {
    e.preventDefault();

    if (!validation()) {
      return;
    }

    if (!captchaToken) {
      toast.error("Please complete the CAPTCHA");
      return;
    }

    const data = {
      email: email,
      password: password,
      recaptchaToken: captchaToken, // Pass the reCAPTCHA token
    };

    loginUserApi(data)
      .then((res) => {
        if (res.data.requireOTP) {
          setLoginData(data);
          setShowOTPForm(true);
          toast.success("OTP sent to your email");
        } else if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          handleLoginSuccess(res.data);
        }
      })
      .catch((error) => {
        toast.error(
          error.response?.data?.message || "Login failed. Please try again."
        );
      });
  };

  // New OTP verification handler
  const handleOTPVerification = () => {
    if (!otp) {
      setOTPError("Please enter the OTP");
      return;
    }

    const verificationData = {
      ...loginData,
      otp: otp,
    };

    loginUserApi(verificationData)
      .then((res) => {
        if (res.data.success) {
          handleLoginSuccess(res.data);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "OTP verification failed");
      });
  };

  // Handle successful login
  const handleLoginSuccess = (data) => {
    toast.success(data.message);
    localStorage.setItem("token", data.token);
    const convertedData = JSON.stringify(data.userData);
    localStorage.setItem("user", convertedData);
    window.location.href = data.userData.isAdmin ? "/admin" : "/homepage";
  };

  // Handle resend OTP
  const handleResendOTP = () => {
    resendLoginOTPApi({ email: loginData.email })
      .then((res) => {
        if (res.data.success) {
          toast.success("OTP resent successfully");
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((error) => {
        toast.error("Failed to resend OTP");
      });
  };

  // OTP Input Component
  const OTPForm = () => (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <Mail className="h-16 w-16 text-blue-600 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Verify Your Login
        </h2>
        <p className="text-gray-600">
          We've sent a verification code to {email}
        </p>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <input
            type="text"
            className={`w-full px-4 py-3 text-center text-2xl tracking-widest border 
              ${otpError ? "border-red-300" : "border-gray-200"} 
              rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none 
              transition-all duration-300 bg-white`}
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOTP(e.target.value)}
            maxLength="6"
          />
          {otpError && <p className="text-red-500 text-sm mt-1">{otpError}</p>}
        </div>

        <button
          onClick={handleOTPVerification}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 
            rounded-lg transition-all duration-300"
        >
          Verify OTP
        </button>

        <div className="text-center mt-4">
          <button
            onClick={handleResendOTP}
            className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            Didn't receive the code? Resend
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <Toaster />
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8 lg:p-12 bg-white">
          {!showOTPForm ? (
            <>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Welcome Back!
                </h2>
                <p className="text-gray-600">Please login to continue</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="Email address"
                    />
                    {emailError && (
                      <p className="text-red-500 text-sm mt-1">{emailError}</p>
                    )}
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="Password"
                    />
                    {passwordError && (
                      <p className="text-red-500 text-sm mt-1">
                        {passwordError}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      Remember me
                    </span>
                  </label>
                  <Link
                    to="/forgetpassword"
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <div className="flex justify-center">
                  <ReCAPTCHA
                    sitekey="6LezGbUqAAAAAEGlXzgckrxE5ooEa5YqlCDUOKlU" // Use your site key
                    onChange={(token) => setCaptchaToken(token)} // Update token state
                  />
                </div>

                <button
                  type="submit"
                  disabled={!captchaToken}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 
                    rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Sign In
                </button>
              </form>

              <p className="mt-8 text-center text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Register now
                </Link>
              </p>
            </>
          ) : (
            <OTPForm />
          )}
        </div>

        {/* Image Section */}
        <div className="hidden md:block w-1/2 bg-gradient-to-br from-blue-500 to-purple-600 p-12">
          <div className="h-full flex items-center justify-center">
            <img
              src={loginui}
              alt="Login"
              className="max-w-full h-auto rounded-xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
