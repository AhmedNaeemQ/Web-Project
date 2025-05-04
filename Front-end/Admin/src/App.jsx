import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Sidebar from "./assets/components/Sidebar";
import Orders from "./pages/Orders/Orders";
import Food from "./pages/Foods/Foods";
import Category from "./pages/Category/Category";
import DeliveryRiders from "./pages/DeliveryRiders/DeliveryRiders";
import Customer from "./pages/Customers/Customer";
import Message from "./pages/Messages/Messages";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <WithSidebar>
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/foods" element={<Food />} />
                  <Route path="/categories" element={<Category />} />
                  <Route path="/delivery-riders" element={<DeliveryRiders />} />
                  <Route path="/customers" element={<Customer />} />
                  <Route path="/messages" element={<Message />} />
                  <Route path="*" element={<Navigate to="/dashboard" />} />
                </Routes>
              </WithSidebar>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

const ProtectedRoute = ({ children }) => {
  const accessToken = localStorage.getItem("accessToken");
  let isValidToken = false;

  if (accessToken) {
    try {
      const decoded = jwt_decode(accessToken);
      const currentTime = Date.now() / 1000;

      if (decoded.exp > currentTime) {
        isValidToken = true;
      }
    } catch (err) {
      console.error("Invalid token:", err);
    }
  }

  return isValidToken ? children : <Navigate to="/" />;
};

const WithSidebar = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4 bg-[#E9F0F7] ml-64 min-h-screen">
        {children}
      </div>
    </div>
  );
};

export default App;
