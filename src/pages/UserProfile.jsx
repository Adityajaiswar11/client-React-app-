import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLatestuser } from "../services/UserProfile";
import Loader from "../components/CustomLoader";
import axios from "axios";

// Utility to calculate age from DOB
const calculateAge = (dob) => {
  const birthDate = new Date(dob);
  const diff = Date.now() - birthDate.getTime();
  const age = new Date(diff).getUTCFullYear() - 1970;
  return age;
};

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [dogImage, setDogImage] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes,AiRandomImgRes] = await Promise.all([
         getLatestuser(),
          axios.get("https://dog.ceo/api/breeds/image/random"),
        ]);
        setUser(userRes.data.data || userRes.data);
        setDogImage(AiRandomImgRes.data.message);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user or image:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Loader />;

  if (!user)
    return (
      <div className="text-center mt-20 text-xl text-gray-500">
        No user data found.
      </div>
    );

  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
      <div className="bg-white shadow-xl rounded-xl p-6 w-full max-w-md text-center">
        <img
          src={dogImage}
          alt="Random Dog"
          className="w-32 h-32 rounded-full mx-auto object-cover border-2 border-blue-400"
        />
        <h2 className="text-2xl font-bold text-gray-700 mt-4">
          {user.firstName} {user.lastName}
        </h2>
        <p className="text-gray-600 mt-2">DOB: {user.dob}</p>
        <p className="text-gray-600">Age: {calculateAge(user.dob)} years</p>

        <button
          onClick={() => navigate("/")}
          className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full cursor-pointer"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
