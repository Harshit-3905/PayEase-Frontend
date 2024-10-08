import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const LoginHandler = async () => {
    const response = await fetch("http://localhost:3000/api/v1/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();
    if (response.status !== 201) {
      console.error(data.error);
      return;
    }
    localStorage.setItem("token", data.token);
    navigate("/");
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex flex-col w-[400px] h-[350px] bg-red-700 p-5 gap-3">
        <h1 className="text-2xl font-bold text-white text-center">Sign In</h1>
        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email</label>
          <input
            className="p-1"
            id="email"
            type="email"
            placeholder="johndoe@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password">Password</label>
          <input
            className="p-1"
            id="password"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="bg-white text-red-700 p-1 rounded-md mt-5"
          onClick={LoginHandler}
        >
          Sign In
        </button>
        <div className="text-center">
          Don&apos;t have an Account? <Link to="/signup">Create Account</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
