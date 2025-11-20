export function Form({
  showform,
  closeform,
  handlechange,
  handlesubmit,
  formdata,
  errors,
}) {
  return (
    <div>
      {showform ? (
        <div className="p-4 sm:p-10 bg-gray-100 min-h-screen flex justify-center">
          <form
            onSubmit={handlesubmit}
            className="bg-white shadow-lg rounded-xl p-6 sm:p-8 w-full max-w-5xl space-y-8"
          >
            {/* Employee Details */}
            {/* close Icon */}
            <div className="flex justify-end">
              <i
                onClick={closeform}
                title="Close" // <- shows native tooltip on hover
                aria-label="Close"
                className="fa-solid fa-xmark cursor-pointer text-red-500 text-xl hover:text-red-600 transition"
                style={{ color: " #ff0000" }}
              ></i>
            </div>
            <div>
              <h1 className="text-xl font-semibold mb-4 text-gray-700">
                Employee Details
              </h1>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="flex flex-col">
                  <label htmlFor="ename" className="text-sm mb-1">
                    Employee Name
                  </label>
                  <input
                    onChange={handlechange}
                    type="text"
                    id="ename"
                    value={formdata.ename}
                    className="border p-2 rounded-md text-sm w-full"
                  />
                  {errors.ename && (
                    <p className="text-red-500 text-xs">{errors.ename}</p>
                  )}
                </div>

                <div className="flex flex-col">
                  <label htmlFor="eid" className="text-sm mb-1">
                    Employee Id
                  </label>
                  <input
                    onChange={handlechange}
                    type="text"
                    id="eid"
                    value={formdata.eid}
                    className="border p-2 rounded-md text-sm w-full"
                  />
                  {errors.eid && (
                    <p className="text-red-500 text-xs">{errors.eid}</p>
                  )}
                </div>

                <div className="flex flex-col">
                  <label htmlFor="cnumber" className="text-sm mb-1">
                    Contact No
                  </label>
                  <input
                    onChange={handlechange}
                    type="text"
                    id="cnumber"
                    value={formdata.cnumber}
                    className="border p-2 rounded-md text-sm w-full"
                  />
                  {errors.cnumber && (
                    <p className="text-red-500 text-xs">{errors.cnumber}</p>
                  )}
                </div>

                <div className="flex flex-col">
                  <label htmlFor="email" className="text-sm mb-1">
                    Email
                  </label>
                  <input
                    onChange={handlechange}
                    type="email"
                    id="email"
                    value={formdata.email}
                    className="border p-2 rounded-md text-sm w-full"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs">{errors.email}</p>
                  )}
                </div>
              </div>
            </div>
            {/* Leave Information */}
            <div>
              <h1 className="text-xl font-semibold mb-4 text-gray-700">
                Leave Information
              </h1>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="flex flex-col">
                  <label htmlFor="tleave" className="text-sm mb-1">
                    Type of Leave
                  </label>
                  <select
                    onChange={handlechange}
                    id="tleave"
                    value={formdata.tleave}
                    className="border p-2 rounded-md text-sm w-full"
                  >
                    <option value="">Select Leave Type</option>
                    <option value="Casual Leave">Casual Leave</option>
                    <option value="Sick Leave">Sick Leave</option>
                    <option value="Emergency Leave">Emergency Leave</option>
                    <option value="Permission">Permission</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.tleave && (
                    <p className="text-red-500 text-xs">{errors.tleave}</p>
                  )}
                </div>

                <div className="flex flex-col">
                  <label htmlFor="fdate" className="text-sm mb-1">
                    From Date
                  </label>
                  <input
                    onChange={handlechange}
                    type="date"
                    id="fdate"
                    value={formdata.fdate}
                    className="border p-2 rounded-md text-sm w-full"
                  />
                  {errors.fdate && (
                    <p className="text-red-500 text-xs">{errors.fdate}</p>
                  )}
                </div>

                <div className="flex flex-col">
                  <label htmlFor="edate" className="text-sm mb-1">
                    End Date
                  </label>
                  <input
                    onChange={handlechange}
                    type="date"
                    id="edate"
                    value={formdata.edate}
                    className="border p-2 rounded-md text-sm w-full"
                  />
                  {errors.edate && (
                    <p className="text-red-500 text-xs">{errors.edate}</p>
                  )}
                </div>
              </div>
            </div>
            {/* Reason */}
            <div>
              <h1 className="text-xl font-semibold mb-4 text-gray-700">
                Reason for Leave
              </h1>
              <textarea
                onChange={handlechange}
                id="rfleave"
                value={formdata.rfleave}
                className="border p-3 rounded-md text-sm w-full h-32 resize-none"
              ></textarea>
              {errors.rfleave && (
                <p className="text-red-500 text-xs">{errors.rfleave}</p>
              )}
            </div>
            {/* Button */}
            <div className="flex justify-end">
              <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm shadow">
                Submit
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
}
