import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import UserDetails from "./pages/UserDetails";

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/user/:id" component={UserDetails} />
            </Switch>
        </Router>
    );
};

export default App;
