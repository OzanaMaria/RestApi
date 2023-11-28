import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Auth/Login";
import Signup from "./Auth/Register";
import Dashboard from "./Dashboard/Dashboard";
import { AuthProvider } from "./Contexts/AuthProvider";

function App() {
    return (
        <>
            <div className='align-items-center justify-content-center'>
                <div className='w-100'>
                    <Router>
                        <AuthProvider>
                            <Routes>
                                <Route path='/' element={<Login/>} />
                                <Route
                                    path='/signup'
                                    element={<Signup/>}
                                />
                                <Route
                                    path='/dashboard'
                                    element={<Dashboard/>}
                                /> 
                            </Routes>
                        </AuthProvider>
                    </Router>
                </div>
            </div>
        </>
    );
}

export default App;