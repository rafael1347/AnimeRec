import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import NavBar from "../Appbar/AppBar";
import { useState } from "react";
import { User } from "../Login/Login";
import { useNavigate } from "react-router-dom";
import React from "react";

export const SignUp = () => {
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const navigate = useNavigate();
  async function postData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
  const handleClick = (e: any) => {
    e.preventDefault();

    if (username && password !== undefined) {
      const newUser: User = {
        username,
        password,
      };
      console.log(newUser);
      postData("https://animerec-api.onrender.com/signup", newUser).then(
        (data) => {
          if (data.success) {
            console.log("success redirecting");
            setTimeout(() => {
              navigate("/login");
            }, 100);
          }
        },
      );
    }
  };
  return (
    <>
      <NavBar />
      <Box
        display={"flex"}
        justifyContent={"center"}
        height={"100%"}
        alignContent={"center"}
      >
        <Box
          component={"form"}
          onSubmit={handleClick}
          sx={{
            justifyContent: "center",
            backgroundColor: "white",
            mt: "50px",
            padding: "40px",
            maxWidth: "400px",
            minWidth: "320px",
            borderRadius: "3px",
          }}
        >
          <Typography
            display={"flex"}
            justifyContent={"center"}
            pb={"60px"}
            variant="h5"
            color={"#3B4958"}
            fontWeight={"600"}
          >
            Create Account
          </Typography>
          <TextField
            required
            fullWidth
            id="username"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            required
            fullWidth
            id="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Box width={"100%"} display={"flex"} justifyContent={"center"}>
            <Button sx={{ mt: "10px" }} type="submit">
              <Typography>Sign Up</Typography>
            </Button>
          </Box>

          <FormHelperText
            sx={{ display: "flex", justifyContent: "center", mt: "20px" }}
          >
            Forgot Password?
          </FormHelperText>
          <FormHelperText
            sx={{ display: "flex", justifyContent: "center", mt: "80px" }}
          >
            Not registered?&nbsp; {<a href="/signup"> Create an Account</a>}
          </FormHelperText>
        </Box>
      </Box>
    </>
  );
};
