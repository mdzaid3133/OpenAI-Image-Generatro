// PopupForm.js
import React, { useState } from "react";
import axios from "axios";

const PopupForm = ({IsOpne,setIsOpen,storedUser}) => {
  
   const [formData, setFormData] = useState(storedUser)

    console.log(formData)
  const closeForm = () => setIsOpen(false);

  const handleSubmit = async(e) => {
    e.preventDefault();
    const response = await axios.post('http://localhost:8000/api/user/editprofile', formData, {
      withCredentials: true,
    });

     console.log('object saved', response?.data?.user)
      localStorage.removeItem('user');
      localStorage.setItem('user', JSON.stringify(response?.data?.user));
    if (response.status === 200) {
      setIsOpen(false);
    } else {
      console.log("Failed to update profile");
    }
      
   
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* Button to open the popup */}

      {/* Popup form overlay */}
      {IsOpne && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-100 z-50">
          <div className="bg-gray-900 p-6 rounded shadow-lg w-full max-w-md mx-4">
            <h2 className="text-2xl font-semibold text-center mb-4">Edit Profile</h2>

            {/* Close button */}
            <button
              onClick={closeForm}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-white mb-2">Username</label>
                <input
                  type="text"
                  value={formData?.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-white bg-transparent"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-white mb-2">Email</label>
                <input
                  type="email"
                  value={formData?.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-white bg-transparent"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopupForm;
