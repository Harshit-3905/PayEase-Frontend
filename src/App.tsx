import "./App.css";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="w-screen h-screen bg-slate-500">
      <Outlet />
    </div>
  );
}

export default App;
