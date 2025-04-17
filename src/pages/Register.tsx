import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components";
import { checkRegisterFormData } from "../utils/checkRegisterFormData";
import customFetch from "../axios/custom";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    if (!checkRegisterFormData(data)) return;

    try {
      const response = await customFetch.post("/register", data);
      const result = response.data;

      if (!result.success) {
        toast.error(result.errors || "An error occurred during registration");
        return;
      }

      toast.success(result.message || "Registered successfully");

      // Optional: Save token if needed
      // localStorage.setItem("token", result.token);

      navigate("/login");
    } catch (error: any) {
      if (error.response && error.response.data) {
        const errorData = error.response.data;
        if (!errorData.success && errorData.errors) {
          toast.error(errorData.errors);
        } else {
          toast.error("Unexpected error. Please try again.");
        }
      } else {
        toast.error("Network error. Please try again later.");
      }
    }
  };

  return (
    <div className="max-w-screen-2xl mx-auto pt-5 flex items-center justify-center bg-white min-h-screen">
      {/* Register Card */}
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-xl w-full space-y-8">
        {/* Header */}
        <h2 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#8B0000] to-[#FF4500]">
          Welcome!
        </h2>
        <p className="text-lg text-center text-gray-700">
          Create your account below.
        </p>

        {/* Form */}
        <form onSubmit={handleRegister} className="flex flex-col gap-6">
          {/* First and Last Name Fields in the Same Row */}
          <div className="flex gap-4">
            {/* First Name Field */}
            <div className="flex flex-col gap-2 w-1/2">
              <label htmlFor="name" className="text-lg font-medium text-gray-800">
                First Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your first name"
                className="border border-gray-300 focus:border-transparent h-14 px-5 text-lg rounded-full outline-none transition-all duration-300 shadow-md hover:shadow-lg"
              />
            </div>

            {/* Last Name Field */}
            <div className="flex flex-col gap-2 w-1/2">
              <label htmlFor="lastname" className="text-lg font-medium text-gray-800">
                Last Name
              </label>
              <input
                type="text"
                name="lastname"
                placeholder="Enter your last name"
                className="border border-gray-300 focus:border-transparent h-14 px-5 text-lg rounded-full outline-none transition-all duration-300 shadow-md hover:shadow-lg"
              />
            </div>
          </div>

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

          {/* Confirm Password Field */}
          <div className="flex flex-col gap-2">
            <label htmlFor="password_confirmation" className="text-lg font-medium text-gray-800">
              Confirm Password
            </label>
            <input
              type="password"
              name="password_confirmation"
              placeholder="Confirm your password"
              className="border border-gray-300 focus:border-transparent h-14 px-5 text-lg rounded-full outline-none transition-all duration-300 shadow-md hover:shadow-lg"
            />
          </div>

          {/* Register Button */}
          <Button
            type="submit"
            text="Register"
            className="h-14 text-lg font-bold text-white bg-gradient-to-r from-[#8B0000] to-[#FF4500] rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95"
          />

          {/* Login Link */}
          <p className="text-center text-gray-700">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#8B0000] font-medium hover:text-[#FF4500] transition-all duration-300"
            >
              Login now
            </Link>
            .
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;