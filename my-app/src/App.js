import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Auth/Login";
import Signup from "./Auth/Register";
import Dashboard from "./Dashboard/Dashboard";
import { AuthProvider } from "./Contexts/AuthProvider";

function App() {
  const defaultValue = "<img onError=alert('Hacked.') src='invalid.url.com'>";
  const [value, setValue] = React.useState(defaultValue);
  const divRef = React.useRef(null);
  const illegalStrings = ["<", ">", "script", "link", "img", "onError"];

  return (
    <>
      <div className="align-items-center justify-content-center">
        <div className="w-100">
          <Router>
            <AuthProvider>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </AuthProvider>
          </Router>
        </div>
      </div>

      {/* verificare a inputului sa nu permita unele cazuri de XSS folosing html tags sau script sau style tags */}
      {/* <div className="App">
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
        ></textarea>
        <div>
          <button
            onClick={() => {
              let validInput = true;
              for (let illegalString of illegalStrings) {
                validInput = value.includes(illegalString) ? false : true;
              }
              if (validInput) divRef.current.innerHTML = value;
            }}
          >
            Send
          </button>
        </div>
        <div ref={divRef}></div>
      </div> */}
    </>
  );
}

export default App;
