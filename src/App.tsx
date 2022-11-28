import Navbar from "./components/Navbar";
import { useState } from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import Home from "./pages/Home/Home";
import Clients from "./pages/Clients/Clients";
import Orders from "./pages/Orders/Orders";
import Stats from "./pages/Stats/Stats";

function App() {
  return (
    <div className="flex h-full">
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/clients">
          <Clients />
        </Route>
        <Route path="/orders">
          <Orders />
        </Route>
        <Route path="/stats">
          <Stats />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
