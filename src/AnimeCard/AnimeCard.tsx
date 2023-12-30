import { Box, Stack, Tooltip, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface AnimeCardProps {
  title: string;
  id?: string | number;
  imgSrc?: string;
}
export const AnimeCard = (props: AnimeCardProps) => {
  const { title, imgSrc, id } = props;
  //console.log(props);
  const navigate = useNavigate();

  const CustomToolTip = () => {
    <Box>
      <Typography>{title}</Typography>
    </Box>;
  };
  return (
    <Tooltip
      placement="right"
      title={
        <Box>
          <Typography>{title}</Typography>
        </Box>
      }
      arrow
    >
      <Box>
        <Box height={"75%"}>
          <img
            src={imgSrc}
            loading="lazy"
            style={{ borderRadius: "5px" }}
            onClick={() => navigate(`Anime/${id}/${title}`)}
          />
        </Box>
        <Box>
          <Typography>{title}</Typography>
        </Box>
      </Box>
    </Tooltip>
  );
};
