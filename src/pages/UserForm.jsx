import { useState } from "react";
import { createUser } from "../services/UserProfile";
import Loader from "../components/CustomLoader";
import { useNavigate } from "react-router-dom";

const UserForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
  });

  const navigate = useNavigate();

  const [isloader, setIsLoader] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim())
      newErrors.firstName = "First Name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last Name is required";
    if (!formData.dob) newErrors.dob = "Date of Birth is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setIsLoader(true);
       await createUser(formData);
      navigate("/user-display");
    } catch (error) {
      alert("Failed to create user. Please try again.");
      console.error(error);
    } finally {
      setIsLoader(false);
    }
  };

  if(isloader) return <Loader /> 

  return (
    <div className="min-h-screen flex items-center justify-center bg-white/35">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
         User Form
        </h2>
        <form onSubmit={handleSubmit} noValidate>
          {/* First Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              className={`w-full px-4 py-2 rounded border ${
                errors.firstName ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="John"
              value={formData.firstName}
              onChange={handleChange}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>

          {/* Last Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              className={`w-full px-4 py-2 rounded border ${
                errors.lastName ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Doe"
              value={formData.lastName}
              onChange={handleChange}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
            )}
          </div>

          {/* DOB */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              className={`w-full px-4 py-2 rounded border ${
                errors.dob ? "border-red-500" : "border-gray-300"
              }`}
              value={formData.dob}
              onChange={handleChange}
            />
            {errors.dob && (
              <p className="text-red-500 text-sm mt-1">{errors.dob}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className=" cursor-pointer w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
