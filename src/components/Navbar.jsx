export function Navbar({ applyleave, homepage }) {
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
          {/* Apply Leave Button */}
          <button
            onClick={applyleave}
            className="bg-white text-blue-600 font-semibold px-4 py-1 rounded-xl 
                       hover:bg-blue-100 transition duration-300 cursor-pointer"
          >
            Apply Leave
          </button>

          {/* User Icon */}
          <button className="p-2 rounded-full hover:bg-blue-600 transition duration-300 cursor-pointer">
            <i className="fa-regular fa-user text-2xl text-white"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
