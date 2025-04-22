import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components";
import { checkLoginFormData } from "../utils/checkLoginFormData";
import customFetch from "../axios/custom";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { setLoginStatus } from "../features/auth/authSlice";
import { store } from "../store";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    if (!checkLoginFormData(data)) return;

    try {
      const response = await customFetch.post("/login", {
        email: data.email,
        password: data.password,
      });

      const { token, user } = response.data;

      // Store token and user in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("You logged in successfully");
      store.dispatch(setLoginStatus(true));
      navigate("/user-profile");
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      toast.success("You are already logged in");
      navigate("/user-profile");
    }
  }, [navigate]);

  return (
    <div className="max-w-screen-2xl mx-auto pt-0 flex items-center justify-center bg-white min-h-screen">
      {/* Login Card */}
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full space-y-8">
        {/* Header */}
        <h2 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#8B0000] to-[#FF4500]">
          Welcome Back!
        </h2>
        <p className="text-lg text-center text-gray-700">
          Enter your credentials to log in.
        </p>

        {/* Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          {/* Email Field */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-lg font-medium text-gray-800">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="border border-gray-300 focus:border-transparent h-14 px-5 text-lg rounded-full outline-none transition-all duration-300 shadow-md hover:shadow-lg"
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-lg font-medium text-gray-800">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="border border-gray-300 focus:border-transparent h-14 px-5 text-lg rounded-full outline-none transition-all duration-300 shadow-md hover:shadow-lg"
            />
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            text="Login"
            className="h-14 text-lg font-bold text-white bg-gradient-to-r from-[#8B0000] to-[#FF4500] rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95"
          />

          {/* Register Link */}
          <p className="text-center text-gray-700">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-[#8B0000] font-medium hover:text-[#FF4500] transition-all duration-300"
            >
              Register now
            </Link>
            .
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
