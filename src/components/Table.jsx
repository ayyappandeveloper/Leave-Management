import { useState, useEffect } from "react";

export function Table({ showTable }) {
  // Get user type from session storage
  const [userType, setUserType] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [leaveApplications, setLeaveApplications] = useState([]);

  // popup value visible
  const [showPopup, setShowPopup] = useState(false);
  const [popupText, setPopupText] = useState("");
  const [popupPos, setPopupPos] = useState({ top: 0, left: 0 });

  // disapprove box open
  const [showDisapprovePopup, setShowDisapprovePopup] = useState(false);
  const [disapproveReason, setDisapproveReason] = useState("");
  const [disapprovePopupPos, setDisapprovePopupPos] = useState({
    top: 0,
    left: 0,
  });
  const [currentAppId, setCurrentAppId] = useState(null);

  useEffect(() => {
    const type = sessionStorage.getItem("userType");
    const email = sessionStorage.getItem("userEmail");
    setUserType(type);
    setUserEmail(email);
    loadLeaveApplications();
  }, []);

  function loadLeaveApplications() {
    const apps = JSON.parse(
      sessionStorage.getItem("leaveApplications") || "[]"
    );
    setLeaveApplications(apps);
  }

  // Reload applications when table is shown
  useEffect(() => {
    if (showTable) {
      loadLeaveApplications();
    }
  }, [showTable]);

  function openPopup(text, event) {
    const rect = event.target.getBoundingClientRect();
    setPopupPos({
      top: rect.bottom + window.scrollY + 8,
      left: rect.left + window.scrollX,
    });
    setPopupText(text);
    setShowPopup(true);
  }

  function closePopup() {
    setShowPopup(false);
    setPopupText("");
  }

  function approveApplication(appId) {
    const apps = JSON.parse(
      sessionStorage.getItem("leaveApplications") || "[]"
    );
    const updatedApps = apps.map((app) =>
      app.id === appId ? { ...app, status: "approved", reason: "" } : app
    );
    sessionStorage.setItem("leaveApplications", JSON.stringify(updatedApps));
    loadLeaveApplications();
  }

  function openDisapprovePopup(event, appId) {
    const rect = event.target.getBoundingClientRect();
    setDisapprovePopupPos({
      top: rect.bottom + window.scrollY + 8,
      left: rect.left + window.scrollX,
    });
    setCurrentAppId(appId);
    setShowDisapprovePopup(true);
  }

  function closeDisapprovePopup() {
    setShowDisapprovePopup(false);
    setDisapproveReason("");
    setCurrentAppId(null);
  }

  function handleReasonSubmit() {
    if (currentAppId !== null && disapproveReason.trim()) {
      const apps = JSON.parse(
        sessionStorage.getItem("leaveApplications") || "[]"
      );
      const updatedApps = apps.map((app) =>
        app.id === currentAppId
          ? { ...app, status: "rejected", reason: disapproveReason }
          : app
      );
      sessionStorage.setItem("leaveApplications", JSON.stringify(updatedApps));
      loadLeaveApplications();
    }
    closeDisapprovePopup();
  }

  // Filter applications based on user type
  const displayApplications =
    userType === "student"
      ? leaveApplications.filter((app) => app.submittedBy === userEmail)
      : leaveApplications;

  return (
    <div>
      {showTable ? (
        <div className="p-6">
          {displayApplications.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500 text-lg">
                No leave applications found
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto shadow-lg rounded-xl">
              <table className="min-w-full text-sm text-gray-700 border-collapse">
                <thead className="bg-blue-500 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left">S.No</th>
                    <th className="px-4 py-3 text-left">Employee Name</th>
                    <th className="px-4 py-3 text-left">Employee Id</th>
                    <th className="px-4 py-3 text-left">Contact No</th>
                    <th className="px-4 py-3 text-left">Email</th>
                    <th className="px-4 py-3 text-left">Type of Leave</th>
                    <th className="px-4 py-3 text-left">From Date</th>
                    <th className="px-4 py-3 text-left">End Date</th>
                    <th className="px-4 py-3 text-left">Reason for Leave</th>
                    {userType === "staff" && (
                      <th className="px-4 py-3 text-center">Actions</th>
                    )}
                    <th className="px-4 py-3 text-center">Status</th>
                    <th className="px-4 py-3 text-left">
                      Reason for Disapprove
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {displayApplications.map((app, index) => {
                    return (
                      <tr key={app.id} className="border-b hover:bg-gray-100">
                        <td className="px-4 py-3">{index + 1}</td>
                        <td className="px-4 py-3">{app.ename}</td>
                        <td className="px-4 py-3">{app.eid}</td>
                        <td className="px-4 py-3">{app.cnumber}</td>
                        <td className="px-4 py-3">{app.email}</td>
                        <td className="px-4 py-3">{app.tleave}</td>
                        <td className="px-4 py-3">{app.fdate}</td>
                        <td className="px-4 py-3">{app.edate}</td>

                        <td className="px-4 py-3 text-center">
                          <button
                            onClick={(e) => openPopup(app.rfleave, e)}
                            className="text-blue-600 underline hover:text-blue-800 text-sm"
                          >
                            View
                          </button>
                        </td>

                        {userType === "staff" && (
                          <td className="px-4 py-3 text-center flex justify-center gap-4">
                            <i
                              onClick={() => approveApplication(app.id)}
                              className="fa-solid fa-check cursor-pointer text-green-500 text-lg hover:scale-110 transition"
                              title="Approve"
                            ></i>
                            <i
                              onClick={(e) => openDisapprovePopup(e, app.id)}
                              className="fa-regular fa-circle-xmark cursor-pointer text-red-500 text-lg hover:scale-110 transition"
                              title="Reject"
                            ></i>
                          </td>
                        )}

                        <td className="px-4 py-3">
                          {app.status === "approved" && (
                            <p className="bg-green-100 text-green-700 font-semibold px-3 py-1 rounded-full shadow-sm text-center">
                              Approved
                            </p>
                          )}
                          {app.status === "rejected" && (
                            <p className="bg-red-100 text-red-700 font-semibold px-3 py-1 rounded-full shadow-sm text-center">
                              Rejected
                            </p>
                          )}
                          {app.status === "pending" && (
                            <p className="bg-yellow-100 text-yellow-700 font-semibold px-3 py-1 rounded-full shadow-sm text-center">
                              Pending
                            </p>
                          )}
                        </td>

                        <td className="px-4 py-3 text-center">
                          {app.reason || "-"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : null}

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 z-50" onClick={closePopup}>
          <div
            className="absolute bg-white w-96 p-6 rounded-xl shadow-2xl animate-slideIn"
            style={{
              top: popupPos.top,
              left: popupPos.left,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closePopup}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
            >
              ×
            </button>

            <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">
              Reason for Leave
            </h2>

            <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed max-h-64 overflow-y-auto">
              {popupText}
            </p>
          </div>
        </div>
      )}

      {/* Disapprove popup */}
      {showDisapprovePopup && userType === "staff" && (
        <div className="fixed inset-0 z-50" onClick={closeDisapprovePopup}>
          <div
            className="absolute bg-white w-96 p-6 rounded-xl shadow-2xl animate-slideIn"
            style={{
              top: disapprovePopupPos.top,
              left: disapprovePopupPos.left,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <button
                onClick={closeDisapprovePopup}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
              >
                ×
              </button>

              <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">
                Reason for Disapproval
              </h2>

              <textarea
                className="w-full h-32 p-2 border rounded-md focus:outline-none focus:ring focus:ring-red-300"
                placeholder="Enter reason for rejection..."
                value={disapproveReason}
                onChange={(e) => setDisapproveReason(e.target.value)}
              />

              <button
                onClick={handleReasonSubmit}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
