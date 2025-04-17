import { useEffect, useState } from "react";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import customFetch from "../axios/custom";
import { setLoginStatus } from "../features/auth/authSlice";
import { store } from "../store";
import LoadingSpinner from "../components/LoadingSpinner";

const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const logout = () => {
    toast.success("Logged out successfully");
    localStorage.removeItem("user");
    localStorage.removeItem("token"); // Remove token from localStorage
    store.dispatch(setLoginStatus(false));
    navigate("/login");
  };

  const fetchUser = async (userId: number | string) => {
    try {
      const response = await customFetch(`/users/${userId}`);
      if (response.data.success && response.data.user) {
        setUser(response.data.user);
      } else {
        toast.error("User not found or unauthorized.");
        navigate("/login");
      }
    } catch (error) {
      toast.error("Failed to fetch user profile.");
      console.error(error);
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("user") || "{}").id;
    if (!userId) {
      toast.error("Please login to view this page");
      navigate("/login");
    } else {
      fetchUser(userId);
    }
  }, [navigate]);

  return (
    <div className="max-w-screen-lg mx-auto mt-2 px-5 min-h-screen bg-white">
      {/* Loading Spinner */}
      {loading && <LoadingSpinner />}

      {/* User Profile Content */}
      {!loading && user && (
        <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md mx-auto space-y-8">
          <h1 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#8B0000] to-[#FF4500]">
            User Profile
          </h1>

          <form className="flex flex-col gap-6">
            {/* First Name Field */}
            <div className="flex flex-col gap-2">
              <label htmlFor="firstname" className="text-lg font-medium text-gray-800">
                First Name
              </label>
              <input
                type="text"
                id="firstname"
                name="name"
                defaultValue={user?.name}
                readOnly // Disable editing
                className="border border-gray-300 focus:border-transparent h-14 px-5 text-lg rounded-full outline-none transition-all duration-300 shadow-md hover:shadow-lg bg-gray-100 cursor-not-allowed"
                placeholder="Enter first name"
              />
            </div>

            {/* Last Name Field */}
            <div className="flex flex-col gap-2">
              <label htmlFor="lastname" className="text-lg font-medium text-gray-800">
                Last Name
              </label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                defaultValue={user?.lastname}
                readOnly // Disable editing
                className="border border-gray-300 focus:border-transparent h-14 px-5 text-lg rounded-full outline-none transition-all duration-300 shadow-md hover:shadow-lg bg-gray-100 cursor-not-allowed"
                placeholder="Enter last name"
              />
            </div>

            {/* Email Field */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-lg font-medium text-gray-800">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                defaultValue={user?.email}
                readOnly // Disable editing
                className="border border-gray-300 focus:border-transparent h-14 px-5 text-lg rounded-full outline-none transition-all duration-300 shadow-md hover:shadow-lg bg-gray-100 cursor-not-allowed"
                placeholder="Enter email address"
              />
            </div>

            {/* Order History Link */}
            <Link
              to="/order-history"
              className="h-14 text-lg font-medium text-[#8B0000] bg-white border border-[#8B0000] rounded-lg shadow-md hover:bg-[#FF4500] hover:text-white transition-all duration-300 flex items-center justify-center"
            >
              Order History
            </Link>

            {/* Logout Button */}
            <Button
              onClick={logout}
              text="Logout"
              className="h-14 text-lg font-bold text-white bg-gradient-to-r from-[#8B0000] to-[#FF4500] rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95"
            />
          </form>
        </div>
      )}
    </div>
  );
};

export default UserProfile;