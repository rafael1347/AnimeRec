import { Box, Grid, Skeleton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { AnimeCard } from "../AnimeCard/AnimeCard";

export const DefaultHomepage = () => {
  const [searchResult, setSearchResult] = useState<any[]>([]);
  const [upComingAnime, setUpcomingAnime] = useState<any[]>([]);
  const [currentSeason, setCurrentSeason] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
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
    setCurrentSeason(results[1]);
    setUpcomingAnime(results[2]);
    setLoading(true);
  }

  const SkeletonMock = () => {
    // Create an array to hold the components
    const skeletonItems = [];

    // Use a loop to add components to the array
    for (let i = 0; i < 4; i++) {
      skeletonItems.push(
        <Grid item xs={3} key={i}>
          <Skeleton variant="rectangular" width="100%" />
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

          <Grid container spacing={1} paddingLeft={30} pr={30} margin={124}>
            {searchResult.map((anime: any, index: number) => (
              <Grid item xs={3} key={index}>
                <AnimeCard
                  title={anime.title}
                  imgSrc={anime.images.jpg.image_url}
                  id={anime.mal_id}
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
              <Grid item xs={3} key={index}>
                <AnimeCard
                  title={anime.title}
                  imgSrc={anime.images.jpg.image_url}
                  id={anime.mal_id}
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
              <Grid item xs={3} key={index}>
                <AnimeCard
                  title={anime.title}
                  imgSrc={anime.images.jpg.image_url}
                  id={anime.mal_id}
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
