import React, { useState } from "react";
import {
  Mail,
  Lock,
  KeyRound,
  ArrowRight,
  CheckCircle2,
  Shield,
  RefreshCw,
} from "lucide-react";
import bcrypt from "bcryptjs";
import {
  forgotPasswordApi,
  getPasswordHistoryApi,
  verifyOtpApi,
} from "../../apis/Api";
import { toast } from "react-hot-toast";


const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [password, setNewPassword] = useState("");
  const [passwordHistory, setPasswordHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await forgotPasswordApi({ email });
      if (res.status === 200) {
        toast.success(res.data.message);
        setIsSent(true);
        const historyRes = await getPasswordHistoryApi({ email });
        if (historyRes.status === 200) {
          setPasswordHistory(historyRes.data.passwordHistory);
        }
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP.");
    }
    setIsLoading(false);
  };

  const validateNewPassword = async (password) => {
    for (const oldPasswordHash of passwordHistory) {
      const isPasswordReused = await bcrypt.compare(password, oldPasswordHash);
      if (isPasswordReused) return false;
    }
    return true;
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const isValidPassword = await validateNewPassword(password);
    if (!isValidPassword) {
      toast.error("Password previously used");
      setIsLoading(false);
      return;
    }

    try {
      const res = await verifyOtpApi({ email, otp, password });
      if (res.status === 200) {
        toast.success(res.data.message);
        setEmail("");
        setOtp("");
        setNewPassword("");
        setPasswordHistory([]);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Verification failed");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Shield className="w-12 h-12 mx-auto mb-4 text-indigo-600" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Password Reset
          </h1>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-xl p-6">
          <h2 className="text-xl text-gray-700 text-center mb-6">
            {!isSent ? "Request Reset Code" : "Enter Reset Details"}
          </h2>

          <div className="space-y-6">
            <div className="space-y-4">
              <div className="group">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="name@example.com"
                    disabled={isSent}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-hover:text-indigo-500 transition-colors" />
                </div>
              </div>

              {!isSent ? (
                <button
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center"
                  onClick={handleSendOtp}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <ArrowRight className="w-4 h-4 mr-2" />
                  )}
                  Send Reset Code
                </button>
              ) : (
                <>
                  <div className="group">
                    <label
                      htmlFor="otp"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Reset Code
                    </label>
                    <div className="relative">
                      <input
                        id="otp"
                        type="number"
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        placeholder="Enter 6-digit code"
                        onChange={(e) => setOtp(e.target.value)}
                      />
                      <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-hover:text-indigo-500 transition-colors" />
                    </div>
                  </div>

                  <div className="group">
                    <label
                      htmlFor="new-password"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        id="new-password"
                        type="password"
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        placeholder="Enter new password"
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-hover:text-indigo-500 transition-colors" />
                    </div>
                  </div>

                  <button
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center"
                    onClick={handleVerifyOtp}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                    )}
                    Reset Password
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
