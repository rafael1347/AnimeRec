import {
  Box,
  Button,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import NavBar from "../Appbar/AppBar";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../AuthContext/AuthContext";
export type User = {
  username: string;
  password: string;
};
export const Login = () => {
  const { authenticated, setAuthenticated, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const handleError = (err: any) =>
    toast.error(err, {
      position: "bottom-left",
    });
  async function postData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      cache: "default", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "include", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
  const handleClick = async (e: any) => {
    e.preventDefault();
    try {
      if (username && password !== undefined) {
        const newUser: User = {
          username,
          password,
        };
        //console.log(newUser);

        const data = await postData("http://localhost:5000/login", newUser);
        const { success, message } = data;
        if (success) {
          setTimeout(() => {
            setAuthenticated(true);
            navigate(`/watchlist`);
          }, 100);
          console.log(success);
        } else {
          console.log(message);
        }
      }
    } catch (error) {
      console.log(error);
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
            Login
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
              <Typography>Login</Typography>
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
