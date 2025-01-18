import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AdminRoutes = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Authentication token missing");
        }

        const response = await fetch("https://localhost:5000/api/user/check-admin", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || "Authorization failed");
        }

        const data = await response.json();

        if (!data.isAdmin) {
          throw new Error("User is not an admin");
        }

        setIsLoading(false); // Successfully verified admin status
      } catch (error) {
        console.error("Error in AdminRoutes:", error.message);
        navigate("/"); // Redirect to homepage or login
      }
    };

    checkAdmin();
  }, [navigate]);

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading spinner or message
  }

  return <Outlet />;
};

export default AdminRoutes;
