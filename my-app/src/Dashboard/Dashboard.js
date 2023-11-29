import { Alert, Button, Card, Form } from "react-bootstrap";
import { useAuth } from "../Contexts/AuthProvider";
import firebase from "../firebase";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useIdleTimer } from "react-idle-timer";

export default function Dashboard() {
  const [state, setState] = useState("Active");
  const [count, setCount] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const onIdle = () => {
    setState("Idle");
  };

  const onActive = () => {
    setState("Active");
  };

  const onAction = () => {
    setCount(count + 1);
  };

  const { getRemainingTime } = useIdleTimer({
    onIdle,
    onActive,
    onAction,
    timeout: 50_000,
    throttle: 500,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(Math.ceil(getRemainingTime() / 1000));
    }, 500);

    return () => {
      clearInterval(interval);
    };
  });

  if (state === "Idle" && firebase.auth().currentUser.email) {
    logout();
    navigate("/");
  }
  return (
    <>
      <h1>React Idle Timer</h1>
      <h2>useIdleTimer</h2>
      <br />
      <p>Current State: {state}</p>
      <p>Action Events: {count}</p>
      <p>{remaining} seconds remaining</p>
    </>
  );
}
