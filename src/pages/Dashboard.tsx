import { useState, useEffect } from "react";
import Header from "../components/Header";
import { Link, useNavigate } from "react-router-dom";

interface User {
  _id: string;
  name: string;
  email: string;
}

const Dashboard = () => {
  const [filter, setFilter] = useState<string>("");
  const [users, setUsers] = useState<Array<User>>([]);
  const [Balance, setBalance] = useState<number>(0);
  const navigate = useNavigate();
  useEffect(() => {
    async function getBalance() {
      const response = await fetch(
        "http://localhost:3000/api/v1/account/balance",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      setBalance(data.balance);
    }
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      getBalance();
    }
  }, []);
  useEffect(() => {
    async function getUsers() {
      const response = await fetch(
        `http://localhost:3000/api/v1/user?filter=${filter}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      setUsers(data);
    }
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      getUsers();
    }
  }, [filter]);

  return (
    <div className="w-full h-[100vh]">
      <Header />
      <div className="flex flex-col w-full h-[90vh] p-10">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <h1 className="text-2xl font-bold">Your Balance : {Balance}</h1>
        <h1 className="text-2xl font-bold">Users</h1>
        <br />
        <input
          type="text"
          className="m-4 p-2"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <br />
        <div className="flex flex-col gap-3 p-2">
          {users?.map((user: User) => (
            <div
              key={user._id}
              className="flex justify-between  bg-green-700 rounded-md p-3"
            >
              <div className="flex flex-col">
                <div>{user.name}</div>
                <div>{user.email}</div>
              </div>
              <Link to={`/send/${user._id}/${user.name}`}>
                <button className="bg-red-600 p-2 rounded-md">
                  Send Money
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
