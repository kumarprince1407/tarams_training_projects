// ToDoList.jsx
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./style.css";
import { Button, InputBase } from "@mui/material";
import { useNavigate } from "react-router-dom";

import TextField from "@mui/material/TextField";

function ToDoList() {
  const [userInput, setUserInput] = useState({
    userid: "",
    title: "",
    completed: false,
  });

  //State for form validation
  const [formValid, setFormValid] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();
  //Extract the username from the token stored in local storage
  const token = localStorage.getItem("accessToken");
  const decodedToken = token ? JSON.parse(atob(token.split(".")[1])) : null;

  //Get the username from the decoded token
  const username = decodedToken ? decodedToken.username : null;

  //change
  const [newItemCounter, setNewItemCounter] = useState(0);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;

    setUserInput((prevState) => ({
      ...prevState,
      [name]: inputValue,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    //Check if any input field is empty
    if (userInput.userid.trim() === "" || userInput.title.trim() === "") {
      setFormValid(false); //Set validation to false
      return;
    }

    setFormValid(true); //Reset form validation state

    //Increment the ID before sending it to the server
    setNewItemCounter((prevCounter) => prevCounter + 1);

    //Assign the counter value as the new id
    const newItem = {
      id: Math.floor(Math.random() * (1000 - 100 + 1)) + 100, //check
      username, //Assign the username of logged in user
      userid: userInput.userid, //check
      title: userInput.title,
      completed: userInput.completed,
    };

    try {
      const response = await axios.post(
        `http://localhost:3002/todolist/${username}`,
        newItem
      );

      if (response.status === 200) {
        console.log("Data sent successfully");
        navigate(`/home/${username}`); // Navigate after successful submission
      } else {
        console.error("Failed to send data:", response.status);
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }

    setUserInput({
      userid: "",
      title: "",
      completed: false,
    });
  };

  const handleButtonClick = () => {
    navigate(`/home/${username}`);
  };

  //Change -State to check whether both input fields are filled
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    //check if both userid and title are filled
    const isValid =
      userInput.userid.trim() !== "" && userInput.title.trim() !== "";
    //The 'trim()' method removes whitespaces from both the ends of a string
    setIsFormValid(isValid);
  }, [userInput]);

  return (
    <>
      <React.Fragment>
        <div className="fragment1">
          <div className="headingContainer">
            <h2 id="heading1">
              {" "}
              <span style={{ marginRight: "20px", fontSize: "60px" }}>
                ToDo List
              </span>
            </h2>
            <br />

            <Button
              variant="contained"
              color="success"
              id="button"
              onClick={handleButtonClick}
              style={{ width: "180px" }}
            >
              Homepage
            </Button>
            <br />
            <br />
          </div>
          {/* Form to add new ToDo */}
          <>
            {/* <h1>
            {username
              ? `Hello, ${username}! Welcome to your dashboard,`
              : `Please Login to view your homepage`}
          </h1> */}
          </>

          <div className="mainContainer">
            <div className="inputForm">
              <h3 id="heading2">Enter new Task</h3>

              <form onSubmit={handleFormSubmit}>
                <label htmlFor="textarea1">
                  <br />
                  Task ID:
                  <TextField
                    // label="Task ID"
                    className="inputfield"
                    type="text"
                    name="userid"
                    value={userInput.userid}
                    onChange={handleInputChange}
                    sx={{ width: "150%" }}
                  />
                </label>
                <br />

                <br />
                <label htmlFor="textarea3">
                  <br />
                  Task details:
                  <TextField
                    // label="Task details:"
                    className="inputfield"
                    type="text"
                    name="title"
                    value={userInput.title}
                    onChange={handleInputChange}
                    sx={{ width: "150%" }}
                  />
                </label>
                <br />
                {!formValid && (
                  <p style={{ color: "red", marginTop: "5px" }}>
                    Please fill in all the fields.
                  </p>
                )}
                <br />

                <br />
                <div className="buttonContainer">
                  <Button
                    variant="contained"
                    color="success"
                    id="button1"
                    type="submit"
                    //disabled={!isFormValid}
                  >
                    Add New Task
                  </Button>
                </div>
              </form>
            </div>
            <>
              {/* {username ? (
              <button onClick={handleLogout}>Logout</button>
            ) : (
              <button onClick={navigateToLogin}>Log In</button>
            )} */}
            </>
          </div>
        </div>
      </React.Fragment>
      {/* <div className="footerContent">
        <footer> &copy; Tarams Technologies</footer>
      </div> */}
    </>
  );
}

export default ToDoList;
