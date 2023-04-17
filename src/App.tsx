import { useState } from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import Clients from "./pages/Clients";
import Navbar from "./components/Navbar";


function App() {
  return (
    <div className="flex flex-col h-full">
      <Navbar/>
      <Switch>
        <Route path="/">
          <Clients />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
