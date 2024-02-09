import { render, screen } from "@testing-library/react";
import { AnimeCard, AnimeCardProps } from "./AnimeCard";
import { BrowserRouter } from "react-router-dom";

test("loads and displays greeting", async () => {
  const props: AnimeCardProps = {
    imgSrc: "https://cdn.myanimelist.net/images/anime/1015/138006.jpg",
    title: "Sousou no Frieren",
  };

  render(
    <BrowserRouter>
      <AnimeCard {...props} />
    </BrowserRouter>,
  );
  screen.debug();
});
