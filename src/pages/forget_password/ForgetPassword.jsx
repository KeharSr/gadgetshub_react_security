import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  forgotPasswordApi,
  verifyOtpApi,
  getPasswordHistoryApi,
} from "../../apis/Api"; // Add `getPasswordHistoryApi`
import bcrypt from "bcryptjs";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [password, setNewPassword] = useState("");
  const [passwordHistory, setPasswordHistory] = useState([]); // Store password history

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await forgotPasswordApi({ email });
      if (res.status === 200) {
        toast.success(res.data.message);
        setIsSent(true);

        // Fetch password history after OTP is sent
        const historyRes = await getPasswordHistoryApi({ email });
        if (historyRes.status === 200) {
          setPasswordHistory(historyRes.data.passwordHistory); // Store password history
        }
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to send OTP.";
      toast.error(errorMessage);
    }
  };

  const validateNewPassword = async (password) => {
    for (const oldPassword of passwordHistory) {
      const isPasswordReused = await bcrypt.compare(password, oldPassword);
      if (isPasswordReused) {
        return false; // Password matches one of the old passwords
      }
    }
    return true; // Password is unique
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    // Validate new password against history
    const isValidPassword = await validateNewPassword(password);
    if (!isValidPassword) {
      toast.error(
        "New password cannot be the same as any previously used passwords."
      );
      return;
    }

    const data = {
      email: email,
      otp: otp,
      password: password,
    };

    try {
      const res = await verifyOtpApi(data);
      if (res.status === 200) {
        toast.success(res.data.message);
        // Optionally reset form or navigate to login
        setEmail("");
        setOtp("");
        setNewPassword("");
        setPasswordHistory([]); // Clear password history
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to verify OTP.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Forgot Password
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Email Address"
                  disabled={isSent}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {!isSent && (
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={handleSendOtp}
                >
                  Send OTP
                </button>
              </div>
            )}

            {isSent && (
              <>
                <div className="rounded-md bg-blue-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-blue-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3 flex-1 md:flex md:justify-between">
                      <p className="text-sm text-blue-700">
                        OTP has been sent to your email {email}.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="otp"
                    className="block text-sm font-medium text-gray-700"
                  >
                    OTP
                  </label>
                  <input
                    type="number"
                    name="otp"
                    id="otp"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    placeholder="Enter valid OTP"
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>

                <div>
                  <label
                    htmlFor="new-password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    name="new-password"
                    id="new-password"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    placeholder="Enter new password"
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={handleVerifyOtp}
                  >
                    Verify OTP and Reset Password
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
