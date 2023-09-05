import { BrowserRouter, Navigate, Route, Router, Routes } from "react-router-dom";
import Clients from "./pages/Clients";
import Navbar from "./components/Navbar";
import Orders from "./pages/Orders";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "sonner";
import { useClientsStore } from "./stores/useClientsStore";
import { useEffect } from "react";
import Login from "./pages/Login";
import ClientForm from "./components/ClientForm";
import { useAuthStore } from "./stores/useAuthStore";
import { getCookie, setCookie } from 'typescript-cookie'

function App() {
  const fetchClients = useClientsStore((state) => state.fetchClients);
  const clientFormVisible = useClientsStore((state) => state.clientFormVisible);

  const authenticated = getCookie("token");

  useEffect(() => {
    fetchClients();
  }, []);

  console.log(authenticated);

  if (authenticated === undefined)
    return (
      <>
        <Toaster richColors position="bottom-left" />
        <Login />
      </>
    );

  return (
    <div className="flex flex-col h-full">
      <BrowserRouter>
        <Navbar />
        <Toaster richColors position="bottom-left" />
        {clientFormVisible ? <ClientForm /> : null}
        <div className="flex flex-col items-center p-8 gap-8 w-full h-full bg-bgDark overflow-scroll">
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
}

export default App;
