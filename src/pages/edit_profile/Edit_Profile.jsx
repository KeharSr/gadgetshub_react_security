import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import { motion } from "framer-motion";
import {
  getCurrentUserApi,
  uploadProfilePictureApi,
  editUserProfileApi,
} from "../../apis/Api";
import { toast } from "react-hot-toast";
import { Camera, User, Mail, Phone, AtSign, Save } from "lucide-react";

const InputField = ({
  icon: Icon,
  label,
  name,
  type = "text",
  value,
  onChange,
}) => {
  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-300 mb-2">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type={type}
          name={name}
          defaultValue={value}
          onBlur={onChange}
          className="block w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
          placeholder={label}
        />
      </div>
    </div>
  );
};

const EditProfile = () => {
  const initialProfile = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    username: "",
    profilePicture: null,
  };

  const [profile, setProfile] = useState(initialProfile);
  const [isLoading, setIsLoading] = useState(false);
  const[profilePicture,setProfilePicture]=useState(null);

  useEffect(() => {
    getCurrentUserApi()
      .then((res) => {
        if (res.status === 200) {
          const userData = res.data.user;
          setProfile({
            firstName: userData.firstName || "",
            lastName: userData.lastName || "",
            email: userData.email || "",
            phoneNumber: userData.phoneNumber || "",
            username: userData.userName || "",
            profilePicture: userData.profilePicture || null,
          });
          setProfilePicture(userData.profilePicture);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to fetch user details");
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("profilePicture", file);

      uploadProfilePictureApi(formData)
        .then((res) => {
          if (res.status === 200) {
            toast.success(res.data.message);
            setProfile((prev) => ({
              ...prev,
              profilePicture: res.data.profilePicture,
            }));
          } else {
            toast.error(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response?.data?.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const updatedProfile = {
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      phoneNumber: profile.phoneNumber,
      userName: profile.username,
      profilePicture: profile.profilePicture,
    };

    try {
      const res = await editUserProfileApi(updatedProfile);
      if (res.status === 200) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700 p-8">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
              <User className="w-8 h-8 mr-3 text-blue-400" />
              Edit Profile
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Profile Picture Section */}
              <div className="flex flex-col items-center space-y-4 mb-8">
                <div className="relative group">
                  {profile.profilePicture ? (
                    <img
                      src={`https://localhost:5000/profile_pictures/${profile.profilePicture}`}
                      alt="Profile"
                      className="w-32 h-32 rounded-full object-cover border-4 border-gray-700 group-hover:border-blue-500 transition-all duration-300"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-gray-700 flex items-center justify-center border-4 border-gray-600">
                      <User className="w-16 h-16 text-gray-400" />
                    </div>
                  )}
                  <label className="absolute bottom-0 right-0 p-2 bg-blue-500 rounded-full cursor-pointer hover:bg-blue-600 transition-colors duration-300">
                    <Camera className="w-5 h-5 text-white" />
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleImageChange}
                      accept="image/*"
                    />
                  </label>
                </div>
                <p className="text-sm text-gray-400">
                  Click the camera icon to change your profile picture
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <InputField
                  icon={User}
                  label="First Name"
                  name="firstName"
                  value={profile.firstName}
                  onChange={handleChange}
                />
                <InputField
                  icon={User}
                  label="Last Name"
                  name="lastName"
                  value={profile.lastName}
                  onChange={handleChange}
                />
              </div>

              <InputField
                icon={AtSign}
                label="Username"
                name="username"
                value={profile.username}
                onChange={handleChange}
              />

              <InputField
                icon={Mail}
                label="Email"
                name="email"
                type="email"
                value={profile.email}
                onChange={handleChange}
              />

              <InputField
                icon={Phone}
                label="Phone Number"
                name="phoneNumber"
                value={profile.phoneNumber}
                onChange={handleChange}
              />

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white" />
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    <span>Update Profile</span>
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EditProfile;
