import { BrowserRouter, Navigate, Route, Router, Routes } from "react-router-dom";
import Clients from "./pages/Clients";
import Navbar from "./components/Navbar";
import Orders from "./pages/Orders";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "sonner";
import { useClientsStore } from "./stores/useClientsStore";
import Login from "./pages/Login";
import ClientForm from "./components/ClientForm";
import { getCookie } from "typescript-cookie";
import Signup from "./pages/Signup";
import axios from "axios";
import authService from "./services/authService";
import { useEffect, useState } from "react";

function App() {
  const fetchClients = useClientsStore((state) => state.fetchClients);
  const clientFormVisible = useClientsStore((state) => state.clientFormVisible);

  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Check for access token on app load
    const accessToken = getCookie("accessToken");
    const refreshToken = getCookie("refreshToken");

    if (accessToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      setAuthenticated(true);
      fetchClients();
    } else if (refreshToken) {
      authService.refreshToken();
      setAuthenticated(true);
      fetchClients();
    } else {
      setAuthenticated(false);
    }
  }, []);

  if (authenticated) {
    return (
      <div className="flex flex-col h-full">
        <BrowserRouter>
          <Navbar />
          <Toaster richColors position="bottom-left" />
          {clientFormVisible ? <ClientForm /> : null}
          <div className="flex flex-col items-center p-8 gap-8 w-full h-full bg-uiSecondary overflow-y-scroll">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    );
  } else
    return (
      <BrowserRouter>
        <Toaster richColors position="bottom-left" />
        <Routes>
          <Route path="/*" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    );
}

export default App;
