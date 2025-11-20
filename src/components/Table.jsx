import { useState } from "react";

export function Table({ showTable, showvalue }) {
  // popup value visible
  const [showPopup, setShowPopup] = useState(false);
  // popup value Storing
  const [popupText, setPopupText] = useState("");
  //popup Movement
  const [popupPos, setPopupPos] = useState({ top: 0, left: 0 });

  // Track status for each row individually
  const [rowStatuses, setRowStatuses] = useState({});

  // disapprove box open
  const [showDisapprovePopup, setShowDisapprovePopup] = useState(false);
  const [disapproveReason, setDisapproveReason] = useState("");
  const [disapprovePopupPos, setDisapprovePopupPos] = useState({
    top: 0,
    left: 0,
  });
  const [currentRowIndex, setCurrentRowIndex] = useState(null);

  function openPopup(text, event) {
    // position code
    const rect = event.target.getBoundingClientRect();

    setPopupPos({
      top: rect.bottom + window.scrollY + 8, // popup below button
      left: rect.left + window.scrollX, // align horizontally
    });

    setPopupText(text);
    setShowPopup(true);
  }

  function closePopup() {
    setShowPopup(false);
    setPopupText("");
  }

  // approve disapprove show for specific row
  function approveshow(index) {
    setRowStatuses((prev) => ({
      ...prev,
      [index]: { status: "approved", reason: "" },
    }));
  }

  function disapproveshow(index) {
    setRowStatuses((prev) => ({
      ...prev,
      [index]: {
        status: "disapproved",
        reason: rowStatuses[index]?.reason || "",
      },
    }));
  }

  // Reason for function disapprove
  function openDisapprovePopup(event, index) {
    const rect = event.target.getBoundingClientRect();
    setDisapprovePopupPos({
      top: rect.bottom + window.scrollY + 8,
      left: rect.left + window.scrollX,
    });
    setCurrentRowIndex(index);
    setShowDisapprovePopup(true);
  }

  function closeDisapprovePopup() {
    setShowDisapprovePopup(false);
    setDisapproveReason("");
    setCurrentRowIndex(null);
  }

  function handlereasonsubmit() {
    if (currentRowIndex !== null) {
      setRowStatuses((prev) => ({
        ...prev,
        [currentRowIndex]: { status: "disapproved", reason: disapproveReason },
      }));
    }
    closeDisapprovePopup();
  }

  return (
    <div>
      {showTable ? (
        <div className="p-6">
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
                  <th className="px-4 py-3 text-center">Actions</th>
                  <th className="px-4 py-3 text-center">Status</th>
                  <th className="px-4 py-3 text-left">Reason for Disapprove</th>
                </tr>
              </thead>

              <tbody>
                {showvalue.map((items, index) => {
                  const rowStatus = rowStatuses[index];

                  return (
                    <tr key={index} className="border-b hover:bg-gray-100">
                      <td className="px-4 py-3">{index + 1}</td>
                      <td className="px-4 py-3">{items.ename}</td>
                      <td className="px-4 py-3">{items.eid}</td>
                      <td className="px-4 py-3">{items.cnumber}</td>
                      <td className="px-4 py-3">{items.email}</td>
                      <td className="px-4 py-3">{items.tleave}</td>
                      <td className="px-4 py-3">{items.fdate}</td>
                      <td className="px-4 py-3">{items.edate}</td>

                      {/* Popup Trigger Button */}
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={(e) => openPopup(items.rfleave, e)}
                          className="text-blue-600 underline hover:text-blue-800 text-sm"
                        >
                          View
                        </button>
                      </td>

                      <td className="px-4 py-3 text-center flex justify-center gap-4">
                        <i
                          onClick={() => approveshow(index)}
                          className="fa-solid fa-check cursor-pointer text-green-500 text-lg hover:scale-110 transition"
                        ></i>
                        <i
                          onClick={(e) => {
                            disapproveshow(index);
                            openDisapprovePopup(e, index);
                          }}
                          className="fa-regular fa-circle-xmark cursor-pointer text-red-500 text-lg hover:scale-110 transition"
                        ></i>
                      </td>

                      <td className="px-4 py-3">
                        {rowStatus?.status === "approved" && (
                          <p className="bg-green-100 text-green-700 font-semibold px-3 py-1 rounded-full shadow-sm">
                            Approved
                          </p>
                        )}
                        {rowStatus?.status === "disapproved" && (
                          <p className="bg-red-100 text-red-700 font-semibold px-3 py-1 rounded-full shadow-sm">
                            Rejected
                          </p>
                        )}
                      </td>

                      <td className="px-4 py-3 text-center">
                        {rowStatus?.reason || ""}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}

      {/* Popup Modal Positioned Below Button */}
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

      {/* disapprove popup */}
      {showDisapprovePopup && (
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
                className="w-full h-32 p-2 border rounded-md focus:outline-none focus:ring"
                value={disapproveReason}
                onChange={(e) => setDisapproveReason(e.target.value)}
              />

              <button
                onClick={handlereasonsubmit}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
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
