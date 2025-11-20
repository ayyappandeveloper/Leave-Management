import { useState } from "react";
import { Navbar } from "./Navbar";
import { Table } from "./Table";
import { Form } from "./Form";

export function LeaveForm() {
  // submit Functionality
  const [showvalue, setvalue] = useState([]);
  const [showform, setform] = useState(false);
  const [showTable, setTable] = useState(true);
  // validation storage
  const [errors, setErrors] = useState({});

  function applyleave() {
    setform(true);
    setTable(false);
  }
  function closeform() {
    setform(false);
    setTable(true);
  }

  //   get form data
  const [formdata, setformdata] = useState({
    ename: "",
    eid: "",
    cnumber: "",
    email: "",
    tleave: "",
    fdate: "",
    edate: "",
    rfleave: "",
  });
  function handlechange(e) {
    setformdata({
      ...formdata,
      [e.target.id]: e.target.value,
    });
    console.log(formdata);
  }
  // submit
  function handlesubmit(e) {
    e.preventDefault();
    // validate form
    if (!validateform()) {
      return;
    }
    setvalue([...showvalue, formdata]);
    setformdata({
      ename: "",
      eid: "",
      cnumber: "",
      email: "",
      tleave: "",
      fdate: "",
      edate: "",
      rfleave: "",
    });
    setTable(true);
    setform(false);
  }

  // form validation
  function validateform() {
    const newErrors = {};
    const today = new Date().toISOString().split("T")[0];

    // NAME → Only A–Z a–z and max 2 dots
    if (!formdata.ename.trim()) {
      newErrors.ename = "Employee Name is required";
    } else if (!/^[A-Za-z\s.]{1,50}$/.test(formdata.ename)) {
      newErrors.ename = "Only letters, spaces and dots allowed";
    } else if ((formdata.ename.match(/\./g) || []).length > 2) {
      newErrors.ename = "Name cannot contain more than 2 dots";
    }

    // EMPLOYEE ID → DPI + 5 digits
    if (!formdata.eid.trim()) {
      newErrors.eid = "Employee ID is required";
    } else if (!/^DPI[0-9]{5}$/.test(formdata.eid)) {
      newErrors.eid =
        "Employee ID must start with DPI and have 5 digits (Ex: DPI12345)";
    }

    // CONTACT → 10 digits
    if (!formdata.cnumber.trim()) {
      newErrors.cnumber = "Contact Number is required";
    } else if (!/^[0-9]{10}$/.test(formdata.cnumber)) {
      newErrors.cnumber = "Enter a valid 10-digit number";
    }

    // EMAIL → must end with @gmail.com
    if (!formdata.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[A-Za-z0-9._%+-]+@gmail\.com$/.test(formdata.email)) {
      newErrors.email = "Email must end with @gmail.com";
    }

    // LEAVE TYPE
    if (!formdata.tleave.trim()) newErrors.tleave = "Select a leave type";

    // DATE VALIDATION
    if (!formdata.fdate) {
      newErrors.fdate = "From Date is required";
    } else if (formdata.fdate < today) {
      newErrors.fdate = "From Date cannot be a past date";
    }

    if (!formdata.edate) {
      newErrors.edate = "End Date is required";
    } else if (formdata.edate < today) {
      newErrors.edate = "End Date cannot be a past date";
    } else if (formdata.edate < formdata.fdate) {
      newErrors.edate = "End Date cannot be before From Date";
    }

    // REASON → Min 60 characters
    if (!formdata.rfleave.trim()) {
      newErrors.rfleave = "Reason for leave is required";
    } else if (formdata.rfleave.trim().length < 60) {
      newErrors.rfleave = "Reason must be at least 60 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  return (
    <div>
      <Navbar applyleave={applyleave} />
      <Form
        showform={showform}
        closeform={closeform}
        // formdata
        handlechange={handlechange}
        // form submit
        handlesubmit={handlesubmit}
        // form value
        formdata={formdata}
        // validation errors
        errors={errors}
      />
      <Table showTable={showTable} showvalue={showvalue} />
    </div>
  );
}
