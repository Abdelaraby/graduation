import React, { useState } from "react";
import customFetch from "../axios/custom";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface Errors {
  name?: string;
  email?: string;
  message?: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [success, setSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let newErrors: Errors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name.";
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Please enter your message.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      try {
        const response = await customFetch.post("/contact", formData);
        if (response.data.success) {
          toast.success("Your message has been sent successfully!");
          setSuccess(true);
          setFormData({ name: "", email: "", message: "" });
        } else {
          toast.error(response.data.message || "Failed to send message.");
        }
      } catch (error: any) {
        console.error("Error sending message:", error);
        toast.error(
          error.response?.data?.message ||
            error.message ||
            "Something went wrong. Please try again."
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="max-w-screen-lg mx-auto mt-6 px-5 min-h-screen bg-white">
      {/* Header */}
      <h1 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#8B0000] to-[#FF4500] mb-10">
        Contact Us
      </h1>

      {/* Contact Information Section */}
      <div className="bg-white rounded-3xl shadow-lg p-6 flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <i className="fa fa-phone fa-2x text-[#8B0000]"></i>
          <p className="text-gray-700 mb-0">+123 456 7890</p>
        </div>
        <div className="flex items-center gap-4">
          <i className="fa fa-globe fa-2x text-[#8B0000]"></i>
          <a href="https://fixandfuel.com" className="text-[#8B0000] hover:text-[#FF4500] transition-colors duration-300">
            fix&fuel.com
          </a>
        </div>
        <div className="flex items-center gap-4">
          <i className="fa fa-map-marker-alt fa-2x text-[#8B0000]"></i>
          <p className="text-gray-700 mb-0">Minia - Shalaby</p>
        </div>
        <div className="flex items-center gap-4">
          <i className="fa fa-envelope fa-2x text-[#8B0000]"></i>
          <a href="mailto:desertrescue@gmail.com" className="text-[#8B0000] hover:text-[#FF4500] transition-colors duration-300">
        Fix&Fuel@gmail.com
          </a>
        </div>
      </div>

      {/* Form and Map Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* Contact Form */}
        <div className="bg-white rounded-3xl shadow-lg p-6 space-y-6 h-auto max-h-[450px] overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-lg font-medium text-gray-800">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className={`block w-full h-12 px-5 text-lg rounded-full border border-gray-300 focus:border-[#8B0000] focus:outline-none transition-all duration-300 shadow-md hover:shadow-lg ${
                  errors.name ? "border-red-500" : ""
                }`}
                disabled={isLoading}
              />
              {errors.name && (
                <p className="text-sm text-red-500 mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-lg font-medium text-gray-800">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className={` block w-full h-12 px-5 text-lg rounded-full border border-gray-300 focus:border-[#8B0000] focus:outline-none transition-all duration-300 shadow-md hover:shadow-lg ${
                  errors.email ? "border-red-500" : ""
                }`}
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email}</p>
              )}
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block text-lg font-medium text-gray-800">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Enter your message"
                rows={2}
                className={`block w-full px-5 py-3 text-lg rounded-2xl border border-gray-300 focus:border-[#8B0000] focus:outline-none transition-all duration-300 shadow-md hover:shadow-lg ${
                  errors.message ? "border-red-500" : ""
                }`}
                disabled={isLoading}
              ></textarea>
              {errors.message && (
                <p className="text-sm text-red-500 mt-1">{errors.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full h-12 text-lg font-bold text-white bg-gradient-to-r from-[#8B0000] to-[#FF4500] rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Submit"}
            </button>

            {/* Success Message */}
            {success && (
              <p className="text-center text-lg text-green-600 font-semibold">
                Your message has been sent successfully!
              </p>
            )}
          </form>
        </div>

        {/* Map */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden h-auto max-h-[450px]">
          <iframe
            src="https://www.google.com/maps/embed/v1/place?q=Minya,+Egypt&key=AIzaSyBSFRN6WWGYwmFi498qXXsD2UwkbmD74v4"
            frameBorder="0"
            scrolling="no"
            marginHeight={0}
            marginWidth={0}
            style={{ width: "100%", height: "100%", minHeight: "400px", borderRadius: "1rem" }}
            title="Our Location"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;