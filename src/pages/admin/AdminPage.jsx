// import React, { useState, useEffect } from "react";
// import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
// import {
//   FaShoppingCart,
//   FaList,
//   FaClipboardList,
//   FaUserCircle,
//   FaSignOutAlt,
// } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";
// import AddProduct from "./AddProduct";
// import ViewProduct from "./ViewProduct";
// import ViewOrder from "./ViewOrder";
// import logo from "../../assets/images/applogo.png";
// import { toast } from "react-hot-toast";
// import { getCurrentUserApi } from "../../apis/Api";

// const AdminPage = () => {
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [profilePicture, setProfilePicture] = useState(
//     "/api/placeholder/40/40"
//   );
//   const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

//   useEffect(() => {
//     getCurrentUserApi()
//       .then((res) => {
//         if (res.status === 200) {
//           setUser(res.data.user);
//           setProfilePicture(
//             `https://localhost:5000/profile_pictures/${res.data.user.profilePicture}`
//           );
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

//   const toggleDropdown = () => {
//     setDropdownOpen(!dropdownOpen);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     toast.success("Logged out successfully");
//     window.location.href = "/login";
//   };

//   return (
//     <div className="bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen flex flex-col">
//       <header className="flex justify-between items-center p-4 bg-white shadow-lg">
//         <div className="flex items-center">
//           <img
//             src={logo}
//             alt="Lensify Logo"
//             className="w-12 h-12 mr-2 rounded-full"
//           />
//           <span className="text-2xl font-bold text-red-600">Gadgets Hub</span>
//         </div>
//         <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-purple-600">
//           Admin Panel
//         </div>
//         <div className="relative">
//           <motion.img
//             src={profilePicture}
//             alt="Profile"
//             className="w-10 h-10 rounded-full cursor-pointer border-2 border-red-600"
//             onClick={toggleDropdown}
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//           />
//           <AnimatePresence>
//             {dropdownOpen && (
//               <motion.div
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -10 }}
//                 className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-10"
//               >
//                 <a
//                   href="/adminprofile"
//                   className="block px-4 py-2 text-gray-800 hover:bg-red-100 flex items-center cursor-pointer"
//                 >
//                   <FaUserCircle className="mr-2" /> Edit Profile
//                 </a>
//                 <a
//                   onClick={handleLogout}
//                   className="block px-4 py-2 text-gray-800 hover:bg-red-100 rounded-b-lg flex items-center cursor-pointer"
//                 >
//                   <FaSignOutAlt className="mr-2" /> Logout
//                 </a>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </header>
//       <Tabs className="flex-grow p-6">
//         <TabList className="flex justify-center bg-white rounded-full shadow-md p-1 mb-6">
//           <Tab
//             className="bg-red-600 text-white py-2 px-6 rounded-full flex items-center mx-2 transition-all duration-300 ease-in-out"
//             selectedClassName="bg-purple-600 shadow-lg transform scale-105"
//           >
//             <FaShoppingCart className="mr-2" /> Add Product
//           </Tab>
//           <Tab
//             className="bg-red-600 text-white py-2 px-6 rounded-full flex items-center mx-2 transition-all duration-300 ease-in-out"
//             selectedClassName="bg-purple-600 shadow-lg transform scale-105"
//           >
//             <FaList className="mr-2" /> View Products
//           </Tab>
//           <Tab
//             className="bg-red-600 text-white py-2 px-6 rounded-full flex items-center mx-2 transition-all duration-300 ease-in-out"
//             selectedClassName="bg-purple-600 shadow-lg transform scale-105"
//           >
//             <FaClipboardList className="mr-2" /> Order Details
//           </Tab>
//         </TabList>
//         <div className="bg-white rounded-lg shadow-lg p-6">
//           <TabPanel>
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//             >
//               <AddProduct />
//             </motion.div>
//           </TabPanel>
//           <TabPanel>
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//             >
//               <ViewProduct />
//             </motion.div>
//           </TabPanel>
//           <TabPanel>
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//             >
//               <ViewOrder />
//             </motion.div>
//           </TabPanel>
//         </div>
//       </Tabs>
//     </div>
//   );
// };

// export default AdminPage;



import React, { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import {
  FaShoppingCart,
  FaList,
  FaClipboardList,
  FaUserCircle,
  FaSignOutAlt,
  FaChartLine,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import AddProduct from "./AddProduct";
import ViewProduct from "./ViewProduct";
import ViewOrder from "./ViewOrder";
import ActivityLogs from "./ActivityLogs"; // New component for activity logs
import logo from "../../assets/images/applogo.png";
import { toast } from "react-hot-toast";
import { getCurrentUserApi } from "../../apis/Api";

const AdminPage = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState("/api/placeholder/40/40");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    getCurrentUserApi()
      .then((res) => {
        if (res.status === 200) {
          setUser(res.data.user);
          setProfilePicture(
            `https://localhost:5000/profile_pictures/${res.data.user.profilePicture}`
          );
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    window.location.href = "/login";
  };

  const tabData = [
    { icon: FaShoppingCart, label: "Add Product", component: AddProduct },
    { icon: FaList, label: "View Products", component: ViewProduct },
    { icon: FaClipboardList, label: "Order Details", component: ViewOrder },
    { icon: FaChartLine, label: "Activity Logs", component: ActivityLogs },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white backdrop-blur-lg bg-opacity-90 fixed w-full top-0 z-50 px-6 py-3 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <motion.img
              src={logo}
              alt="Lensify Logo"
              className="w-12 h-12 rounded-xl"
              whileHover={{ scale: 1.05 }}
            />
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent">
                Gadgets Hub
              </span>
              <span className="text-sm text-gray-500">Admin Dashboard</span>
            </div>
          </div>

          <div className="relative">
            <motion.div
              className="flex items-center space-x-3 cursor-pointer"
              onClick={toggleDropdown}
            >
              <div className="text-right hidden md:block">
                <p className="text-sm font-medium text-gray-700">{user?.name}</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
              <motion.img
                src={profilePicture}
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-purple-500"
                whileHover={{ scale: 1.05 }}
              />
            </motion.div>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
                >
                  <a
                    href="/adminprofile"
                    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <FaUserCircle className="mr-2 text-purple-500" />
                    Edit Profile
                  </a>
                  <a
                    onClick={handleLogout}
                    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <FaSignOutAlt className="mr-2 text-red-500" />
                    Logout
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 px-6 pb-6">
        <div className="max-w-7xl mx-auto">
          <Tabs>
            <TabList className="flex flex-wrap justify-center bg-white rounded-2xl shadow-sm p-2 mb-6">
              {tabData.map(({ icon: Icon, label }) => (
                <Tab
                  key={label}
                  className="group flex items-center space-x-2 px-6 py-3 rounded-xl cursor-pointer transition-all duration-200 ease-in-out mx-2 my-1"
                  selectedClassName="bg-gradient-to-r from-red-500 to-purple-600 text-white shadow-lg transform scale-105"
                >
                  <Icon className="text-xl group-hover:scale-110 transition-transform duration-200" />
                  <span>{label}</span>
                </Tab>
              ))}
            </TabList>

            <div className="bg-white rounded-2xl shadow-sm p-6">
              {tabData.map(({ label, component: Component }) => (
                <TabPanel key={label}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Component />
                  </motion.div>
                </TabPanel>
              ))}
            </div>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;