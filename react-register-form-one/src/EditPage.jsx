// EditPage.jsx
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import "./style.css";
import { Button, InputBase } from "@mui/material";
import { useParams, useNavigate, useLocation } from "react-router-dom";

import TextField from "@mui/material/TextField";

function EditPage() {
  //Change
  const location = useLocation();

  const { id, username } = useParams();

  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({
    userid: "",
    title: "",
    completed: false,
  });

  //Retrieve username using location state
  // const username = location.state?.username;

  //Create a ref for Textfield input
  const titleInputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          // `http://localhost:3002/todolist/${id}/${username}`
          // The id in the URL is a parameter retrieved using the useParams hook
          `http://localhost:3002/todolist/${id}`
        );
        const data = response.data;
        console.log("Data:", data);
        setUserInput({
          userid: data.userid,
          title: data.title,
          completed: data.completed,
        });
        //Focus on the title input when data is loaded
        //titleInputRef.current.focus();
        titleInputRef.current?.focus(); // Use optional chaining here
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    //Only fetch data if the username is defined

    fetchData();
  }, [id, username]);

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

    // Perform the update logic using the id of the item being edited
    const itemId = location.state?.id; // We may need to pass the id when navigating
    console.log(username);
    try {
      const response = await axios.patch(
        // `http://localhost:3002/todolist/${id}/${username}`,
        `http://localhost:3002/todolist/${username}/${id}`,
        {
          ...userInput, // Spread userInput properties
          id: parseInt(id), //Include the id in the request body
        }
      );

      if (response.status === 200) {
        console.log("Data updated successfully");

        navigate(`/home/${username}`); // Navigate after successful submission
        //navigate("/home");
      } else {
        console.error("Failed to update data:", response.status);
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleButtonClick = () => {
    //    navigate(`/home/${username}`, { state: { username } });
    navigate(`/home/${username}`); //ASK

    //navigate(`/home/${username}`, { state: { username } }); //ASK: Why is it giving 'undefined' output - http://localhost:3000/home/undefined
    //navigate(`/home/${location.username}`);
    // Ensure that location state is properly set when navigating to EditPage
    // if (location.state && location.state.username) {
    //   // navigate(`/home/${location.state.username}`);
    //   navigate(`home/${username}`);
    // } else {
    //   console.log("Username not found in the location state");
    // }
  };

  return (
    <>
      <React.Fragment>
        <div className="fragment1">
          <div className="headingContainer">
            <h2 id="heading1">
              {" "}
              <span style={{ marginRight: "20px", fontSize: "60px" }}>
                Edit Task
              </span>
            </h2>
            <Button
              variant="contained"
              color="success"
              id="button"
              onClick={handleButtonClick}
            >
              Homepage
            </Button>
          </div>

          <div className="mainContainer">
            <div className="inputForm">
              <h3 id="heading2">Update Task Details</h3>

              <form onSubmit={handleFormSubmit}>
                <label htmlFor="textarea1">
                  <br />
                  <p>Task ID:</p>
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
                  <p>Task details:</p>
                  <TextField
                    // label="Update task details:"
                    className="inputfield"
                    type="text"
                    name="title"
                    value={userInput.title}
                    onChange={handleInputChange}
                    sx={{ width: "150%" }}
                  />
                </label>
                <br />
                <br />

                <br />
                <div className="buttonContainer">
                  <Button
                    variant="contained"
                    color="success"
                    id="button3"
                    type="submit"
                  >
                    Update & Save
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
      {/* <div className="footerContent">
        <footer> &copy; Tarams Technologies</footer>
      </div> */}
    </>
  );
}

export default EditPage;
