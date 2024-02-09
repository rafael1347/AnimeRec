import {
  SentimentDissatisfiedOutlined,
  SentimentSatisfiedAlt,
} from "@mui/icons-material";
import { Box, Chip, Tooltip, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export interface AnimeCardProps {
  title: string;
  id?: string | number;
  imgSrc?: string;
  score?: string;
  genre?: any[];
  episodes?: string;
}
export const AnimeCard = (props: AnimeCardProps) => {
  const { title, imgSrc, id, score, genre } = props;

  const navigate = useNavigate();

  return (
    <Tooltip
      placement="right"
      componentsProps={{
        tooltip: {
          sx: {
            bgcolor: "common.white",
            "& .MuiTooltip-arrow": {
              color: "common.white",
            },
          },
        },
      }}
      title={
        <Box>
          <Typography color={"black"}>{title}</Typography>
          <Box display={"flex"} flexDirection={"row"}>
            {Number(score) > 6.9 ? (
              <SentimentSatisfiedAlt sx={{ color: "green" }} />
            ) : (
              <SentimentDissatisfiedOutlined sx={{ color: "red" }} />
            )}
            <Typography color={"black"} ml={"10px"}>
              {score} / 10
            </Typography>
          </Box>

          {genre?.map((genre, key) => <Chip key={key} label={genre.name} />)}
        </Box>
      }
      arrow
    >
      <Box height={"100%"}>
        <Box height={"90%"}>
          <img
            src={imgSrc}
            alt={title}
            loading="lazy"
            height={"100%"}
            width={"100%"}
            style={{ borderRadius: "5px" }}
            onClick={() => navigate(`Anime/${id}/${title}`)}
          />
        </Box>
        <Box>
          <Typography noWrap color={"100 115 128"}>
            {title}
          </Typography>
        </Box>
      </Box>
    </Tooltip>
  );
};
