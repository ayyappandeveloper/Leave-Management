import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();

  // User credentials
  const staffuser = {
    email: "staff@gmail.com",
    password: "12345",
  };

  const studentuser = {
    email: "student@gmail.com",
    password: "12345",
  };

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  function handleinput(e) {
    setUser({ ...user, [e.target.id]: e.target.value });
    setError(""); // Clear error when user types
  }

  function handlesubmit(e) {
    e.preventDefault();

    if (
      user.email === staffuser.email &&
      user.password === staffuser.password
    ) {
      console.log("Staff successfully logged in");
      // Store user type in sessionStorage or localStorage if needed
      sessionStorage.setItem("userType", "staff");
      sessionStorage.setItem("userEmail", user.email);
      navigate("/LeaveForm");
    } else if (
      user.email === studentuser.email &&
      user.password === studentuser.password
    ) {
      console.log("Student successfully logged in");
      sessionStorage.setItem("userType", "student");
      sessionStorage.setItem("userEmail", user.email);
      navigate("/LeaveForm");
    } else {
      console.log("Login unsuccessful");
      setError("Invalid email or password");
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handlesubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-96"
      >
        <div>
          <h1 className="text-center text-3xl font-bold text-blue-600 mb-6">
            Login
          </h1>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm">
              {error}
            </div>
          )}

          {/* Demo Credentials Info */}
          <div className="bg-blue-50 border border-blue-200 p-3 rounded mb-4 text-xs">
            <p className="font-semibold text-blue-800 mb-2">
              Demo Credentials:
            </p>
            <div className="text-blue-700">
              <p>
                <strong>Staff:</strong> staff@gmail.com / 12345
              </p>
              <p>
                <strong>Student:</strong> student@gmail.com / 12345
              </p>
            </div>
          </div>

          <div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-semibold mb-2"
              >
                Email
              </label>
              <input
                onChange={handleinput}
                value={user.email}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                type="email"
                id="email"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 font-semibold mb-2"
              >
                Password
              </label>
              <input
                onChange={handleinput}
                value={user.password}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                type="password"
                id="password"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition duration-300"
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
