import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiXMark } from "react-icons/hi2";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../hooks";
import { setLoginStatus } from "../features/auth/authSlice";
import { store } from "../store";

const SidebarMenu = ({
  isSidebarOpen,
  setIsSidebarOpen,
}: {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (prev: boolean) => void;
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const { loginStatus } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation(); // Get the current route

  const logout = () => {
    toast.error("Logged out successfully");
    localStorage.removeItem("user");
    store.dispatch(setLoginStatus(false));
    navigate("/login");
  };

  useEffect(() => {
    if (isSidebarOpen) {
      setIsAnimating(true);
    } else {
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isSidebarOpen]);

  // Helper function to check if a link is active
  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {(isSidebarOpen || isAnimating) && (
        <div
          className={
            isSidebarOpen
              ? "fixed top-0 left-0 w-64 z-50 h-full transition-transform duration-300 ease-in-out bg-white shadow-lg transform translate-x-0"
              : "fixed top-0 left-0 w-64 z-50 h-full transition-transform duration-300 ease-in-out bg-white shadow-lg transform -translate-x-full"
          }
        >
          {/* Close Button */}
          <div className="flex justify-end mr-1 mt-1">
            <HiXMark
              className="text-3xl cursor-pointer"
              onClick={() => setIsSidebarOpen(false)}
            />
          </div>

          {/* Title */}
          <div className="flex justify-center mt-4">
            <Link
              to="/"
              className="text-2xl font-bold tracking-[1.08px] max-sm:text-3xl max-[400px]:text-2xl text-black"
            >
              Desert Rescue
            </Link>
          </div>

          {/* Menu Items */}
          <div className="flex flex-col items-center gap-2 mt-7 px-2">
            {/* Common Link Component */}
            {[
              { to: "/", label: "Home" },
              { to: "/shop", label: "Shop" },
              { to: "/search", label: "Search" },
              { to: "/services", label: "Services" },
              { to: "/contact", label: "Contact" },
              { to: "/cart", label: "Cart" },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`py-2 w-full block text-center rounded ${
                  isActive(to)
                    ? "bg-[#8B0000] text-white" // Dark red background
                    : "hover:bg-gray-200 text-black"
                }`}
              >
                {label}
              </Link>
            ))}

            {/* Conditional Login/Logout Buttons */}
            {loginStatus ? (
              <button
                onClick={logout}
                className={`py-2 w-full block text-center rounded ${
                  isActive("/logout")
                    ? "bg-[#8B0000] text-white" // Dark red background
                    : "hover:bg-gray-200 text-black"
                }`}
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`py-2 w-full block text-center rounded ${
                    isActive("/login")
                      ? "bg-[#8B0000] text-white" // Dark red background
                      : "hover:bg-gray-200 text-black"
                  }`}
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className={`py-2 w-full block text-center rounded ${
                    isActive("/register")
                      ? "bg-[#8B0000] text-white" // Dark red background
                      : "hover:bg-gray-200 text-black"
                  }`}
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SidebarMenu;