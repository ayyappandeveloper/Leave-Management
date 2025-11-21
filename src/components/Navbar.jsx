import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Navbar({ applyleave, homepage }) {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [userType, setUserType] = useState("");
  const dropdownRef = useRef(null);

  // Get user type from session storage
  useEffect(() => {
    const type = sessionStorage.getItem("userType");
    setUserType(type);
  }, []);

  function handleLogout() {
    // Clear user data
    sessionStorage.removeItem("userType");
    sessionStorage.removeItem("userEmail");
    setShowDropdown(false);
    navigate("/");
  }

  function toggleDropdown() {
    setShowDropdown(!showDropdown);
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center p-3 bg-blue-500 shadow-md">
        {/* Left Section and navigate functionality*/}
        <h1
          onClick={homepage}
          className="ml-4 text-2xl font-semibold text-white cursor-pointer"
        >
          Leave Form
        </h1>

        {/* Right Section */}
        <div className="flex items-center gap-6 mr-6">
          {/* Apply Leave Button - Only show for students */}
          {userType === "student" && (
            <button
              onClick={applyleave}
              className="bg-white text-blue-600 font-semibold px-4 py-1 rounded-xl 
                         hover:bg-blue-100 transition duration-300 cursor-pointer"
            >
              Apply Leave
            </button>
          )}

          {/* User Icon with Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="p-2 rounded-full hover:bg-blue-600 transition duration-300 cursor-pointer"
            >
              <i className="fa-regular fa-user text-2xl text-white"></i>
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                {/* User Info */}
                <div className="px-4 py-2 border-b">
                  <p className="text-xs text-gray-500">Logged in as</p>
                  <p className="text-sm font-semibold text-gray-700 capitalize">
                    {userType}
                  </p>
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-200 flex items-center"
                >
                  <i className="fa-solid fa-right-from-bracket mr-2"></i>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
