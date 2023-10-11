import { BrowserRouter, Route, Routes } from "react-router-dom";
import Clients from "./pages/Clients";
import Navbar from "./components/Navbar";
import Orders from "./pages/Orders";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "sonner";
import { useClientsStore } from "./stores/useClientsStore";
import ClientForm from "./components/ClientForm";
import { getCookie } from "typescript-cookie";
import SignUp from "./pages/SignUp";
import authService from "./services/authService";
import { useEffect, useState } from "react";
import Layout from "./components/Layout";
import SignIn from "./pages/SignIn";

function App() {
  // access the client store and get the fetchClients function and clientFormVisible state
  const { fetchClients, clientFormVisible } = useClientsStore();

  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Check for access token on app load
    const accessToken = getCookie("accessToken");
    const refreshToken = getCookie("refreshToken");

    // If access token exists, set authenticated to true and fetch clients
    if (accessToken) {
      setAuthenticated(true);
      fetchClients();
    }
    // If refresh token exists, refresh access token and set authenticated to true
    else if (refreshToken) {
      authService.refreshToken();
      setAuthenticated(true);
      fetchClients();
    }
    // If neither exist, set authenticated to false
    else {
      setAuthenticated(false);
    }
  }, []);

  // If authenticated, render app
  if (authenticated) {
    return (
      <div className="flex h-full flex-col bg-white dark:bg-zinc-800">
        <BrowserRouter>
          <Navbar />
          <Toaster richColors position="bottom-left" />
          {clientFormVisible ? <ClientForm /> : null}
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/orders" element={<Orders />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </div>
    );
  }
  // If not authenticated, render login page
  else
    return (
      <BrowserRouter>
        <Toaster richColors position="bottom-left" />
        <Routes>
          <Route path="/*" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    );
}

export default App;
