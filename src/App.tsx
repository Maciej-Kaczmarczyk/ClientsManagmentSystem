import Navbar from "./components/Navbar";
import { useState } from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Clients from "./pages/Clients";
import Orders from "./pages/Orders";
import Stats from "./pages/Stats";
import Options from "./pages/Options";

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
        <Route path="/options">
          <Options />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
