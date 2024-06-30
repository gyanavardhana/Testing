import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../Homepage/Navigationbar";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_URL}contactus`,
        formData
      );
      console.log(response.data); // Handle success response
      // Redirect to a thank you page or display a success message
      navigate("/thank-you");
    } catch (error) {
      console.error("Error submitting form:", error); // Handle error
    }
  };

  return (
    <div>
      <NavigationBar />
      <div className="bg-gray-100">
        <header className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-gray-800">Contact Us</h1>
        </header>

        <main className="container mx-auto px-4 py-12">
          <section className="mb-12 bg-white rounded-lg shadow-md">
            <div className="px-8 py-8">
              <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
              <p className="text-lg mb-6">
                If you have any questions or feedback, please feel free to
                contact us using the form below:
              </p>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      className="block text-gray-700 font-bold mb-2"
                      htmlFor="name"
                    >
                      Name:
                    </label>
                    <input
                      className="border border-gray-300 rounded-lg py-2 px-3 w-full focus:outline-none focus:border-blue-500"
                      type="text"
                      id="name"
                      name="name"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label
                      className="block text-gray-700 font-bold mb-2"
                      htmlFor="email"
                    >
                      Email:
                    </label>
                    <input
                      className="border border-gray-300 rounded-lg py-2 px-3 w-full focus:outline-none focus:border-blue-500"
                      type="email"
                      id="email"
                      name="email"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="message"
                  >
                    Message:
                  </label>
                  <textarea
                    className="border border-gray-300 rounded-lg py-2 px-3 w-full h-32 resize-none focus:outline-none focus:border-blue-500"
                    id="message"
                    name="message"
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg mt-8"
                  type="submit"
                >
                  Submit
                </button>
              </form>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default ContactUs;
