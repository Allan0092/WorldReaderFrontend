import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getCurrentUserDetails } from "../../../utils/authUtil";

function ProfilePage() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [resetPassword, setResetPassword] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userDetails = await getCurrentUserDetails();
        setEmail(userDetails.email);
        setFirstName(userDetails.first_name);
        setLastName(userDetails.last_name);
        setCountry(userDetails.country);
      } catch (error) {
        console.error("Failed to fetch user details", error);
      }
    };
    fetchUserDetails();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5000/api/user/${id}`,
        {
          email,
          first_name: firstName,
          last_name: lastName,
          country,
          resetPassword,
        }
      );
      if (response.status === 200) {
        toast.success("Profile updated successfully");
      } else {
        toast.error("Failed to update profile");
      }
    } catch (e) {
      toast.error("An error occurred while updating the profile");
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/user/${id}`
      );
      if (response.status === 200) {
        toast.success("User deleted successfully");
      } else if (response.status === 404) {
        toast.error("User not found");
      }
    } catch (e) {
      toast.error("Could not delete user");
    }
  };

  return (
    <>
      <div>
        <div className="font-fondamento font-extrabold mt-6 ml-3">
          <h1 className="text-5xl">Personal Info</h1>
        </div>
      </div>
      <div className="border-2 p-5 m-6">
        <form onSubmit={handleSubmit}>
          <div>
            <label className="font-fondamento text-xl" htmlFor="email">
              Email
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label className="font-fondamento text-xl" htmlFor="first_name">
              First Name
            </label>
            <input
              type="text"
              id="first_name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label className="font-fondamento text-xl" htmlFor="last_name">
              Last Name
            </label>
            <input
              type="text"
              id="last_name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label className="font-fondamento text-xl" htmlFor="country">
              Country
            </label>
            <input
              type="text"
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Update Profile
          </button>
        </form>
        <button
          onClick={handleDelete}
          className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Delete Account
        </button>
      </div>
    </>
  );
}

export default ProfilePage;
