import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import {
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import NavBar from "../Appbar/AppBar";
import { AnimeCard } from "../AnimeCard/AnimeCard";
import { genres, seasons, Format, years } from "../Searchbar/searchUtils";
import { DefaultHomepage } from "./DefaultHomepage";
import { Footer } from "../Appbar/Footer";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

export function HomePage() {
  const [searchResult, setSearchResult] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const [genresOptions, setGenresOptions] = useState<string[]>([]);
  const [yearOptions, setYearOptions] = useState<string>("");
  const [seasonOptions, setSeasonOptions] = useState<string>("");
  const [formatOptions, setFormatOptions] = useState<string>("");

  const handleChange = (
    event: SelectChangeEvent<
      | typeof genresOptions
      | typeof yearOptions
      | typeof seasonOptions
      | typeof formatOptions
    >
  ) => {
    const {
      target: { value },
    } = event;
    console.log(value);
    if (typeof value === "string" && seasons.includes(value)) {
      if (value === "-") {
        setSeasonOptions("");
      } else setSeasonOptions(value);
    } else if (typeof value === "string" && Format.includes(value)) {
      setFormatOptions(value);
    } else if (typeof value === "string" && years.includes(value)) {
      setYearOptions(value);
    } else {
      setGenresOptions(
        // On autofill we get a stringified value.
        typeof value === "string" ? value.split(",") : value
      );
    }
  };

  async function api(url: string): Promise<any> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await (response.json() as Promise<{ data: any }>);
    setSearchResult(data.data);
    return data.data;
  }
  useEffect(() => {
    const formatFilter = formatOptions ? "&type=" + formatOptions : "";
    if (query !== "") {
      const sendRequest = setTimeout(() => {
        api(
          `https://api.jikan.moe/v4/anime?q=${query}&sfw&limit=9${formatFilter}
          `
        );
      }, 200);
      return () => clearTimeout(sendRequest);
    }
  }, [query, genresOptions, formatOptions]);
  console.log(searchResult);
  return (
    <Stack
      direction={"column"}
      spacing={1}
      sx={{ flexGrow: 1 }}
      height={"100%"}
    >
      <NavBar />

      <Stack direction={"row"} spacing={1} pr={24} pl={24}>
        <Box width={"20%"}>
          <Typography>Search</Typography>
          <TextField
            fullWidth
            label={<SearchIcon />}
            onChange={(e) => setQuery(e.target.value)}
          />
        </Box>
        <Box width={"20%"}>
          <Typography>Genres</Typography>
          <Select
            multiple
            value={genresOptions}
            fullWidth
            MenuProps={MenuProps}
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {genres.map((genre) => (
              <MenuItem key={genre} value={genre}>
                {genre}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box width={"20%"}>
          <Typography>Year</Typography>

          <Select
            value={yearOptions}
            fullWidth
            MenuProps={MenuProps}
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {genres.map((genre) => (
              <MenuItem key={genre} value={genre}>
                {genre}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box width={"20%"}>
          <Typography>Season</Typography>

          <Select
            value={seasonOptions}
            fullWidth
            MenuProps={MenuProps}
            onChange={handleChange}
          >
            {seasons.map((seasons) => (
              <MenuItem key={seasons} value={seasons}>
                {seasons}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box width={"20%"}>
          <Typography>Format</Typography>
          <Select
            value={formatOptions}
            fullWidth
            MenuProps={MenuProps}
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {Format.map((format) => (
              <MenuItem key={format} value={format}>
                {format}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Stack>
      <Grid container spacing={2} paddingLeft={30} pr={30} margin={124}>
        {query !== "" &&
          searchResult.map((anime: any, index: number) => (
            <Grid item xs={4} key={index}>
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
      {query === "" && <DefaultHomepage />}

      <Footer></Footer>
    </Stack>
  );
}
