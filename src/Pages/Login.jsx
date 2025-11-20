import { useState } from "react";

const [user, setuser] = useState(
  {
    email: "student123@gmail.com",
    password: "1234567",
  },
  {
    email: "staff321@gmail.com",
    password: "1234567",
  }
);

export function Login() {
  return (
    <div className="flex justify-center items-center ">
      <div>
        <h1 className="text-center">Login</h1>
        <div>
          <div>
            <label htmlFor="email">Email </label>
            <input className="border m-2" type="text" id="uname" />
          </div>
          <div>
            <label htmlFor="password">Password </label>
            <input className="border" type="password" id="password" />
          </div>
          <button className="border p-1">Login</button>
        </div>
      </div>
    </div>
  );
}
