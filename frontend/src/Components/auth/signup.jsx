import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validate_obj from "../../Validation.js";

const SignupForm = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    file: "",
  });
  const [error, setError] = useState("");

  const navigator = useNavigate();
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name == "file") {
      setData({
        ...data,
        [name]: files[0],
      });
    } else {
      setData({
        ...data,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const Namev = Validate_obj.validateName(data.name);
    const Emailv = Validate_obj.validateEmail(data.email);
    const Passv = Validate_obj.validatePassword(data.password);

    if (typeof Namev == "string" && Namev.length > 1) {
      return setError(Namev);
    }
    if (typeof Emailv == "string" && Emailv.length > 2) {
      return setError(Emailv);
    }
    if (typeof Passv == "string" && Passv.length > 2) {
      return setError(Passv);
    }

    setError("");

    const formDataBody = new FormData();
    formDataBody.append("name", data.name);
    formDataBody.append("email", data.email);
    formDataBody.append("password", data.password);
    formDataBody.append("files", data.files);
    try {
      await axios.post("http://localhost:8080/user/signup", formDataBody, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigator("/login");
    } catch (err) {
      console.log("Something wrong happened ", err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        {/* Name  */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Email  */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* password  */}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* File upload  */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload File
          </label>
          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={handleChange}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
        </div>
        <p className="text-red">{error}</p>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Sign Up
        </button>
        <p className="text-center">
          Have an account{" "}
          <Link to={"/login"} className="text-blue-500">
            login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignupForm;
