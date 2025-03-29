import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Sidebar from "./assets/components/Sidebar";
import Orders from "./pages/Orders/Orders";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="*"
          element={
            <WithSidebar>
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/users" element={<div>Users Page</div>} />
                <Route path="/settings" element={<div>Settings Page</div>} />
                {/* Add more routes here */}
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </WithSidebar>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

const WithSidebar = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4 bg-[#E9F0F7]">{children}</div>
    </div>
  );
};

export default App;
