import { Box, Fab, Grid, Typography, Button } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { Anime } from "../AnimeDetails/Anime";
import NavBar from "../Appbar/AppBar";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import Avatar from "@mui/material/Avatar";
import { Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext/AuthContext";

export const Watchlist = () => {
  const { authenticated, user } = useContext(AuthContext);
  const [animeDetails, setAnimeDetails] = useState<Anime[]>();
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();

  async function deleteData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data),
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
  const fetchAnime = async () => {
    const response = await fetch(`http://localhost:5000/anime/`, {
      credentials: "include",
    });
    const data = (await response.json()) as Anime[];
    if (data.length === 0) {
      setAnimeDetails(undefined);
    } else {
      setAnimeDetails(data);
    }
  };
  const handleDelete = (anime: Anime) => {
    deleteData(`http://localhost:5000/anime/delete`, anime).then((data) => {
      fetchAnime();
      console.log(data); // JSON data parsed by `data.json()` call
    });
  };

  useEffect(() => {
    if (!cookies.token) {
      navigate("/login");
    } else {
      fetchAnime();
    }
  }, [cookies.token, navigate]);
  return (
    <>
      <NavBar />

      <Box
        height={"330px"}
        sx={{ backgroundColor: "#2b2d42", position: "relative" }}
      >
        <Box
          flexDirection={"row"}
          position={"absolute"}
          bottom={0}
          display={"flex"}
          pb={"5px"}
          pl={"25px"}
        >
          <Avatar sx={{ width: "150px", height: "150px" }}></Avatar>
          <Typography
            variant="h4"
            color={"whitesmoke"}
            display={"flex"}
            alignItems={"flex-end"}
          >
            Welcome {user}!
          </Typography>
        </Box>
      </Box>
      <Box
        display={"flex"}
        justifyContent={"center"}
        sx={{
          backgroundColor: "white",
        }}
      >
        <Typography>AnimeList</Typography>
      </Box>
      <Grid
        container
        spacing={1}
        justifyContent={"center"}
        alignItems={"center"}
        pt={"25px"}
      >
        {animeDetails ? (
          animeDetails.map((anime, key) => (
            <Grid item zeroMinWidth key={key}>
              <Box
                height={"210px"}
                width={"100%"}
                position={"relative"}
                key={`Box: ${key}`}
                sx={{
                  ":hover": {
                    ".MuiFab-root": {
                      opacity: 1,
                    },
                  },
                }}
              >
                <img
                  src={anime.imgSrc}
                  height={"100%"}
                  alt=""
                  style={{ borderRadius: "5px" }}
                />

                <Fab
                  size="small"
                  sx={{
                    position: "absolute",
                    right: "0px",
                    top: 0,

                    opacity: 0,
                  }}
                  onClick={() => handleDelete(animeDetails[key])}
                >
                  <Delete />
                </Fab>

                <Box
                  height={"15%"}
                  position={"absolute"}
                  display={"flex"}
                  justifyContent={"center"}
                  sx={{ backgroundColor: "RGB(31, 38, 49)", opacity: 0.8 }}
                  zIndex={2}
                  left={0}
                  right={"0px"}
                  bottom={0}
                  borderRadius={"0px 0px 5px 4px"}
                >
                  <Typography color={"whitesmoke"} noWrap>
                    {anime.title}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))
        ) : (
          <Box>
            <Button onClick={() => navigate("/")}>
              <Typography>Add Anime!</Typography>
            </Button>
          </Box>
        )}
      </Grid>
    </>
  );
};
