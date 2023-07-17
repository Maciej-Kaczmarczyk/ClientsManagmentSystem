import { BrowserRouter, Route, Routes } from "react-router-dom";
import Clients from "./pages/Clients";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "sonner";
import { useClientsStore } from "./stores/useClientsStore";
import { useEffect } from "react";

function App() {
    const fetchClients = useClientsStore((state) => state.fetchClients);

    useEffect(() => {
        fetchClients();
    }, []);

    return (
        <div className="flex flex-col h-full">
            <BrowserRouter>
                <Navbar />
                <Toaster richColors position="bottom-left" />
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/clients" element={<Clients />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
