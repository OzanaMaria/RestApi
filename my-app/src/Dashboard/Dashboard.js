import axios from "axios";
import React from "react";
import { Alert, Button, Card, Row, Col, Placeholder } from "react-bootstrap";
import { useAuth } from "../Contexts/AuthProvider";
import firebase from "../firebase";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useIdleTimer } from "react-idle-timer";
import Tabss from "./Tabs";
import "./Dashboard.css";
import logo from "../logo.svg";

export default function Dashboard() {
  const defaultValue = "<img onError=alert('Hacked.') src='invalid.url.com'>";
  const [value, setValue] = React.useState(defaultValue);
  const divRef = React.useRef(null);
  const illegalStrings = ["<", ">", "script", "link", "img", "onError"];
  const [state, setState] = useState("Active");
  const [count, setCount] = useState(0);
  const [remaining, setRemaining] = useState(6);
  const { logout } = useAuth();
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const client = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com/posts",
  });

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
    timeout: 10_000,
    throttle: 500,
  });

  useEffect(() => {
    const fetchPost = async () => {
      // let response = await client.get("?_limit=10");
      // setPosts(response.data);
      axios.get("http://localhost:3002/post").then(
        res => { console.log(res); setPosts(res.data.data) }
      ).catch(err => console.log("eroare", err))
    };
    fetchPost();
    const interval = setInterval(() => {
      setRemaining(Math.ceil(getRemainingTime() / 1000));
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (state === "Idle" && firebase.auth().currentUser.email) {
    logout();
    navigate("/");
  }
  const deletePost = async (id) => {
    await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.status === 200) {
        setPosts(
          posts.filter((post) => {
            return post.id !== id;
          })
        );
      } else {
        return;
      }
    });
  };

  return (
    <div>

      <Tabss />
      {remaining <= 5 ? (
        <Alert variant="danger">
          Session will be closed soon due to inactivity!
        </Alert>
      ) : (
        <div />
      )}

      <div className="container-fluid d-flex justify-content-center flex-container">
        <Row>
          {/* verificare a inputului sa nu permita unele cazuri de XSS folosing html tags sau script sau style tags */}
          <div>
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
          </div>
        </Row>
        <Row className="card-list">
          {posts.map((post) => {
            return (
              <Card style={{ width: "20vw" }}>
                <div className="overflow">
                  <Card.Img variant="top" src={logo} />
                </div>
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Text>{post.text}</Card.Text>
                  <Row>
                    <Col className="m-2">
                      <Button
                        variant="dark"
                        onClick={() => deletePost(post.id)}
                      >
                        Delete
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            );
          })}
        </Row>

      </div>
    </div>
  );
}
