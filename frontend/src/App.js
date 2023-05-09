import React, { useEffect, useState } from "react";
import "./App.css";
import Home from "./pages/home";
import { Routes, Route } from "react-router-dom";
import UserContext from "./UserContext";
import axios from 'axios';
import ProtectedRoute from "./ProtectedRoute";

function App() {

  const [user, setUser] = useState(undefined);

  useEffect(() => {
    axios.get('/api/user', {withCredentials: true})
      .then(response => {
        setUser(response.data.username);
      })
      .catch(() => {
        setUser(false);
      })
  })

  return (
    <UserContext.Provider value={{user, setUser}}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />}/>
          </Route>
        </Routes>
    </UserContext.Provider>
  );
}

export default App;
