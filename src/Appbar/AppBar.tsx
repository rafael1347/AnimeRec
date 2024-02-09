import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { AuthContext } from "../AuthContext/AuthContext";
import { useContext } from "react";
import React from "react";

export default function NavBar() {
  const { authenticated, setAuthenticated } = useContext(AuthContext);
  const [cookies, removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const Logout = () => {
    setAuthenticated(false);
    removeCookie("token", {});
    navigate("/login");
  };

  return (
    <Box width={"100%"} sx={{ flexGrow: 1, backgroundColor: "#2b2d42" }}>
      <AppBar position="static" sx={{ backgroundColor: "#2b2d42" }}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            AnimeRec
          </Typography>

          {authenticated ? (
            <>
              <Button onClick={() => navigate("/watchlist")}>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
                  color={"white"}
                >
                  Watchlist
                </Typography>
              </Button>
              <Button onClick={() => navigate("/")}>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
                  color={"white"}
                >
                  Search
                </Typography>
              </Button>
              <Button onClick={Logout}>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
                  color={"white"}
                >
                  Logout
                </Typography>
              </Button>
            </>
          ) : (
            <>
              <Button onClick={() => navigate("/")}>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
                  color={"white"}
                >
                  Search
                </Typography>
              </Button>
              <Button onClick={() => navigate("/login")}>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
                  color={"white"}
                >
                  Login
                </Typography>
              </Button>
              <Button onClick={() => navigate("/signup")}>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
                  color={"white"}
                >
                  Sign Up
                </Typography>
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
