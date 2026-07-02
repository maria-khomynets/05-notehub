import axios from "axios";
import type { Movie } from "../types/note";

interface MoviesHttpResponse {
  results: Movie[];
  page: number;
  total_pages: number;
}

const token = `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`;

export async function fetchMovies(
  search: string,
  currentPage: number = 1,
): Promise<MoviesHttpResponse> {
  const parameters = {
    params: {
      query: search,
      page: currentPage,
    },
    headers: {
      Authorization: token,
      accept: "application/json",
    },
  };
  const response = await axios.get<MoviesHttpResponse>(
    "https://api.themoviedb.org/3/search/movie",
    parameters,
  );

  return response.data;
}
