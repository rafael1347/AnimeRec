import { Box, Button, Stack, Typography } from "@mui/material";
import NavBar from "../Appbar/AppBar";
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { useCookies } from "react-cookie";
import { AuthContext } from "../AuthContext/AuthContext";
import { Footer } from "../Appbar/Footer";

export type Anime = {
  title: string;
  id?: string | number;
  imgSrc?: string;
  description?: string;
  genre?: any[];
  episodes?: number | string;
  episodeDuration?: string;
  status?: string;
  score?: number;
  scored_by?: number;
  season?: string;
  year?: number;
  trailer?: Trailer;
};
export type Trailer = {
  embed_url: string;
};
export const AnimeOverview = () => {
  const { id } = useParams();
  const [animeDetails, setAnimeDetails] = useState<Anime>();
  const [payload, setPayload] = useState({});
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchAnime = async () => {
      const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
      const data = await response.json();
      const title = data.data.title;
      const description = data.data.synopsis;
      const genre = data.data.genres;
      const imgSrc = data.data.images.jpg.image_url;
      const episodes = data.data.episodes;
      const episodeDuration = data.data.duration;
      const status = data.data.status;
      const score = data.data.score;
      const scored_by = data.data.scored_by;
      const season = data.data.season;
      const year = data.data.year;
      const trailer = data.data.trailer;

      console.log(data);

      const newAnime: Anime = {
        title,
        imgSrc,
        description,
        genre,
        id,
        episodeDuration,
        episodes,
        status,
        score,
        scored_by,
        season,
        year,
        trailer,
      };
      setAnimeDetails(newAnime);
      setPayload({
        user: user,
        title,
        imgSrc,
        description,
        genre,
        id,
        episodeDuration,
        episodes,
        status,
        score,
        scored_by,
        season,
        year,
        trailer,
      });
    };
    fetchAnime();
  }, [id, user]);
  // console.log(animeDetails);
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
  console.log(payload);
  const handleClick = async () => {
    postData("https://animerec-api.onrender.com/anime/add", payload).then(
      (data) => {
        console.log(data); // JSON data parsed by `data.json()` call
      }
    );
  };

  return (
    <Stack direction={"column"} sx={{ backgroundColor: "237,241,245" }}>
      <NavBar />
      <Box
        pl={"210px"}
        pr={"50px"}
        pt={"20px"}
        display={"flex"}
        sx={{ backgroundColor: "white" }}
      >
        <Box>
          <img src={animeDetails?.imgSrc} style={{ borderRadius: "5px" }} />
          <Button
            onClick={handleClick}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "blue",
            }}
          >
            <Typography color={"white"}>Add to List</Typography>
          </Button>
        </Box>
        <Box paddingTop={"25px"} pl={"30px"}>
          <Typography variant="h5" pb={"25px"}>
            {animeDetails?.title}
          </Typography>
          <Typography>{animeDetails?.description}</Typography>
        </Box>
      </Box>
      <Stack direction={"row"} pb={"20px"}>
        <Box
          ml={"210px"}
          mt={"25px"}
          width={"15%"}
          sx={{ backgroundColor: "white", borderRadius: "3px" }}
        >
          <Box padding={"18px"}>
            <Typography color={"#5C728A"} fontWeight={500} pb={"5px"}>
              Episodes
            </Typography>
            <Typography pb={"14px"}>{animeDetails?.episodes}</Typography>
            <Typography pb={"5px"}>Episode Duration</Typography>
            <Typography pb={"14px"}>{animeDetails?.episodeDuration}</Typography>
            <Typography pb={"5px"}>Status</Typography>
            <Typography pb={"14px"}>{animeDetails?.status}</Typography>
            <Typography pb={"5px"}>Average Score</Typography>
            <Typography pb={"14px"}>{animeDetails?.score}</Typography>
          </Box>
        </Box>
        <Box ml={"40px"} width={"100%"} mt={"25px"}>
          <Typography color={"#5C728A"} mb={"10px"}>
            trailer
          </Typography>
          <iframe
            width="560"
            height="315"
            src={animeDetails?.trailer?.embed_url}
            title="YouTube video player"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            style={{ border: 0, borderRadius: "3px" }}
          ></iframe>
        </Box>
      </Stack>
      <Footer></Footer>
    </Stack>
  );
};
