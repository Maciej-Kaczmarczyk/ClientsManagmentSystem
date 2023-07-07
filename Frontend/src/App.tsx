import { BrowserRouter, Route, Routes } from "react-router-dom";
import Clients from "./pages/Clients";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import {Toaster} from 'sonner';

function App() {
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
