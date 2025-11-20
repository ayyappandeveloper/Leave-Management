import "./App.css";
import { LeaveForm } from "./components/LeaveForm";
import { Login } from "./Pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LeaveForm />} />
        <Route path="/Login/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
