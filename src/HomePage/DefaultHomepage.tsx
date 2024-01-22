import {
  Box,
  Grid,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { AnimeCard } from "../AnimeCard/AnimeCard";

export const DefaultHomepage = () => {
  const [searchResult, setSearchResult] = useState<any[]>([]);
  const [upComingAnime, setUpcomingAnime] = useState<any[]>([]);
  const [currentSeason, setCurrentSeason] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up("lg"));
  const tablet = useMediaQuery(theme.breakpoints.up("sm"));
  const mobile = useMediaQuery(theme.breakpoints.up("xs"));
  const delay = (ms = 1400) => new Promise((r) => setTimeout(r, ms));
  const endpoints = [
    `https://api.jikan.moe/v4/top/anime?limit=4`,
    "https://api.jikan.moe/v4/seasons/upcoming?limit=4",
    "https://api.jikan.moe/v4/seasons/now?limit=4",
  ];

  async function api(): Promise<any> {
    let results = [];
    for (let index = 0; index < endpoints.length; index++) {
      await delay();
      const response = await fetch(endpoints[index]);
      const data = await (response.json() as Promise<{ data: any }>);

      results.push(data.data);
    }
    setSearchResult(results[0]);
    setCurrentSeason(results[2]);
    setUpcomingAnime(results[1]);
    setLoading(true);
  }

  const SkeletonMock = () => {
    // Create an array to hold the components
    const skeletonItems = [];

    // Use a loop to add components to the array
    for (let i = 0; i < 4; i++) {
      skeletonItems.push(
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
          padding={0}
          key={i}
          width={desktop ? "185px" : undefined}
          height={desktop ? "317px" : undefined}
        >
          <Skeleton variant="rectangular" width="100%" height={"100%"} />
        </Grid>
      );
    }

    // Return the array of components
    return <>{skeletonItems}</>;
  };

  useEffect(() => {
    api();
  }, []);
  return (
    <>
      {loading ? (
        <>
          <Box ml={124} pl={30}>
            <Typography variant="h4" color={"100 115 128"}>
              Top Anime
            </Typography>
          </Box>

          <Grid container spacing={2} paddingLeft={30} pr={30} margin={124}>
            {searchResult.map((anime: any, index: number) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                padding={0}
                width={desktop ? "185px" : undefined}
                height={desktop ? "317px" : undefined}
                key={index}
              >
                <AnimeCard
                  title={anime.title}
                  imgSrc={anime.images.jpg.image_url}
                  id={anime.mal_id}
                  genre={anime.genres}
                  score={anime.score}
                />
              </Grid>
            ))}
          </Grid>
          <Box ml={124} pl={30}>
            <Typography variant="h4" color={"100 115 128"}>
              Current Season
            </Typography>
          </Box>

          <Grid container spacing={1} paddingLeft={30} pr={30} margin={124}>
            {currentSeason.map((anime: any, index: number) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                padding={0}
                key={index}
                width={desktop ? "185px" : undefined}
                height={desktop ? "317px" : undefined}
              >
                <AnimeCard
                  title={anime.title}
                  imgSrc={anime.images.jpg.image_url}
                  id={anime.mal_id}
                  genre={anime.genres}
                  score={anime.score}
                />
              </Grid>
            ))}
          </Grid>
          <Box ml={124} pl={30}>
            <Typography variant="h4" color={"100 115 128"}>
              Upcoming Season
            </Typography>
          </Box>

          <Grid container spacing={1} paddingLeft={30} pr={30} margin={124}>
            {upComingAnime.map((anime: any, index: number) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                padding={0}
                key={index}
                width={desktop ? "185px" : undefined}
                height={desktop ? "317px" : undefined}
              >
                <AnimeCard
                  title={anime.title}
                  imgSrc={anime.images.jpg.image_url}
                  id={anime.mal_id}
                  genre={anime.genres}
                  score={anime.score}
                />
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <>
          <Box ml={124} pl={30}>
            <Skeleton variant="text" width={"10%"} />
          </Box>

          <Grid container spacing={1} paddingLeft={30} pr={30} margin={124}>
            {<SkeletonMock />}
          </Grid>
          <Box ml={124} pl={30}>
            <Skeleton variant="text" width={"10%"} />
          </Box>

          <Grid container spacing={1} paddingLeft={30} pr={30} margin={124}>
            {<SkeletonMock />}
          </Grid>
          <Box ml={124} pl={30}>
            <Skeleton variant="text" width={"10%"} />
          </Box>

          <Grid container spacing={1} paddingLeft={30} pr={30} margin={124}>
            {<SkeletonMock />}
          </Grid>
        </>
      )}
    </>
  );
};
