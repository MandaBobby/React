import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const Name = () => {
  const [name, setName] = useState("");
  const navgate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    localStorage.setItem("name", JSON.stringify(name));
    navgate("/Time");
  };

  return (
    <>
      <center>
        <form onSubmit={submitHandler}>
          <br />
          <h1> Quiz entry form</h1>
          <br />
          <label>Enter your name :- </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <br />
          <br />
          <center>
            <Button variant="primary" type="submit">
              submit
            </Button>
          </center>
        </form>
      </center>
    </>
  );
};

export default Name;
