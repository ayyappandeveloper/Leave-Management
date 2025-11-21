import "./App.css";
import { LeaveForm } from "./components/LeaveForm";
import { Login } from "./Pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/LeaveForm" element={<LeaveForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
