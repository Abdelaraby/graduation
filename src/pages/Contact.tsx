import React, { useState } from "react";
import customFetch from "../axios/custom";

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
    name: "Name",
    email: "E-mail",
    message: "Message",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [success, setSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFocus = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (value === "Name" || value === "E-mail" || value === "Message") {
      setFormData({ ...formData, [name]: "" });
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (value === "") {
      setFormData({
        ...formData,
        [name]:
          name === "name" ? "Name" : name === "email" ? "E-mail" : "Message",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let newErrors: Errors = {};

    if (formData.name === "Name" || formData.name === "") {
      newErrors.name = "Please enter name";
    }
    if (
      formData.email === "E-mail" ||
      formData.email === "" ||
      !formData.email.includes("@")
    ) {
      newErrors.email = "E-mail is not a valid format";
    }
    if (formData.message === "Message" || formData.message === "") {
      newErrors.message = "Please enter message";
    }

    setErrors(newErrors);
    setErrorMessage(null);

    if (Object.keys(newErrors).length === 0) {
      const token = localStorage.getItem("token");
      if (!token) {
        setErrorMessage("Authentication token is missing. Please log in.");
        return;
      }

      setIsLoading(true);
      try {
        const response = await customFetch.post("/contact", formData);
        console.log("Response from backend:", response.data);
        if (response.data.success) {
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
            setFormData({ name: "Name", email: "E-mail", message: "Message" });
            setIsLoading(false);
          }, 2000);
        } else {
          setIsLoading(false);
          setErrorMessage(response.data.message || "Failed to send message.");
        }
      } catch (error: any) {
        setIsLoading(false);
        const errorMsg =
          error.response?.status === 401
            ? "Unauthorized: Invalid or expired token."
            : error.response?.data?.message ||
              error.message ||
              "Something went wrong, please try again.";
        setErrorMessage(errorMsg);
        console.error("Error details:", {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        });
      }
    }
  };

  return (
    <div className="contact-section">
      <div className="container bootstrap snippets bootdeys">
        <div className="contact-details text-center">
          <div className="contact-item">
            <i className="fa fa-phone fa-2x text-colored"></i>
            <p>01012279600</p>
          </div>
          <div className="contact-item">
            <i className="fa fa-globe fa-2x text-colored"></i>
            <a href="https://desertrescue.com" className="text-muted">
              desertrescue.com
            </a>
          </div>
          <div className="contact-item">
            <i className="fa fa-map-marker-alt fa-2x text-colored"></i>
            <p>Minia - Shalaby</p>
          </div>
          <div className="contact-item">
            <i className="fa fa-envelope fa-2x text-colored"></i>
            <a href="mailto:desertrescue@gmail.com" className="text-muted">
              desertrescue@gmail.com
            </a>
          </div>
        </div>

        <div className="row contact-page">
          <div className="col-sm-6">
            <div className="contact-map">
              <iframe
                src="https://www.google.com/maps/embed/v1/place?q=Minya,+Egypt&key=AIzaSyBSFRN6WWGYwmFi498qXXsD2UwkbmD74v4"
                frameBorder="0"
                scrolling="no"
                marginHeight={0}
                marginWidth={0}
                style={{ width: "100%", height: "360px" }}
                title="Our Location"
              ></iframe>
            </div>
          </div>

          <div className="col-sm-6">
            <form
              role="form"
              name="ajax-form"
              id="ajax-form"
              className="form-main"
              onSubmit={handleSubmit}
            >
              <div className="form-group">
                <label htmlFor="name2">Name</label>
                <input
                  className="form-control"
                  id="name2"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  disabled={isLoading}
                />
                {errors.name && (
                  <div className="error" style={{ display: "block" }}>
                    {errors.name}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email2">Email</label>
                <input
                  className="form-control"
                  id="email2"
                  name="email"
                  type="text"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  disabled={isLoading}
                />
                {errors.email && (
                  <div className="error" style={{ display: "block" }}>
                    {errors.email}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="message2">Message</label>
                <textarea
                  className="form-control textarea"
                  id="message2"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  disabled={isLoading}
                ></textarea>
                {errors.message && (
                  <div className="error" style={{ display: "block" }}>
                    {errors.message}
                  </div>
                )}
              </div>

              <div className="row">
                <div className="col-xs-12">
                  {success && (
                    <div id="ajaxsuccess" className="text-success">
                      E-mail was successfully sent.
                    </div>
                  )}
                  {Object.keys(errors).length > 0 && (
                    <div className="error" id="err-form">
                      There was a problem validating the form, please check!
                    </div>
                  )}
                  {errorMessage && (
                    <div className="error" id="err-backend">
                      {errorMessage}
                    </div>
                  )}
                  <button
                    type="submit"
                    className="btn btn-primary btn-shadow btn-rounded w-md"
                    id="send"
                    disabled={isLoading}
                  >
                    {isLoading ? "Sending..." : "Submit"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;