import { Toaster, toast } from "react-hot-toast";
import Modal from "../Modal/Modal";
import SearchBox from "../SearchBox/SearchBox";
import Loader from "../NoteForm/NoteForm";
import ErrorMessage from "../NoteList/NoteList";
import MovieGrid from "../Pagination/Pagination";
import { fetchMovies } from "../../services/noteService";
import type { Movie } from "../../types/note";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import css from "./App.module.css";
import ReactPaginateModule from "react-paginate";
import type { ReactPaginateProps } from "react-paginate";
import type { ComponentType } from "react";
import { useState, useEffect } from "react";

type ModuleWithDefault<T> = { default: T };
const ReactPaginate = (
  ReactPaginateModule as unknown as ModuleWithDefault<
    ComponentType<ReactPaginateProps>
  >
).default;

export default function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["movies", query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: query !== "",
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (query && isSuccess && data?.results.length === 0) {
      toast.error("No movies found for your request.");
    }
  }, [query, isSuccess, data]);

  const handleSearch = (search: string) => {
    setQuery(search);
    setPage(1);
  };

  const handleClick = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  const totalPages = data?.total_pages ?? 0;
  return (
    <div className={css.App}>
      <SearchBar onSubmit={handleSearch} />

      {totalPages > 1 && (
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setPage(selected + 1)}
          forcePage={page - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}

      {isLoading && <Loader />}

      {isError && <ErrorMessage />}

      {data && <MovieGrid movies={data.results} onSelect={handleClick} />}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}

      <Toaster />
    </div>
  );
}
