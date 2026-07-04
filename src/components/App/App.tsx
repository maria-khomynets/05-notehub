import { useQuery, keepPreviousData } from "@tanstack/react-query";
import NoteList from "../NoteList/NoteList";
import SearchBox from "../SearchBox/SearchBox";
import { useDebouncedCallback } from "use-debounce";
import css from "./App.module.css";
import { fetchNotes, queryKey } from "../../services/noteService";
import { useState } from "react";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";

import Loader from "../Loader/Loader";
import Pagination from "../Pagination/Pagination";
import { Toaster } from "react-hot-toast";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
export default function App() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSearch = useDebouncedCallback((search: string) => {
    setSearch(search);
    setCurrentPage(1);
  }, 1000);
  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: [queryKey, search, currentPage], //пагінація
    queryFn: () => fetchNotes({ search: search, page: currentPage }),
    placeholderData: keepPreviousData,
  });
  const totalPages = data?.totalPages ?? 0;
  console.log({
    isLoading,
    isError,
    data,
  });
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={handleSearch} />
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
        <button onClick={openModal} className={css.button}>
          Create note +
        </button>
      </header>
      {isError && <ErrorMessage />}
      {isLoading && <Loader />}
      {isFetching && <Loader />}
      {!isLoading && !isError && data?.notes.length === 0 && (
        <p>No notes found.</p>
      )}
      {data?.notes.length ? <NoteList notes={data.notes} /> : null}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onCancel={closeModal} onSuccess={closeModal} />
        </Modal>
      )}
      <Toaster />
    </div>
  );
}
