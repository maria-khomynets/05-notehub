import { useQuery, keepPreviousData } from "@tanstack/react-query";
import NoteList from "../NoteList/NoteList";
import SearchBox from "../SearchBox/SearchBox";
import { useDebouncedCallback } from "use-debounce";
import css from "./App.module.css";
import { fetchNotes } from "../../services/noteService";
import { useState, useEffect } from "react";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../Loader/Loader";
import Pagination from "../Pagination/Pagination";
export default function App() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleSearch = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);
      setCurrentPage(1);
    },
    1000,
  );
  const { data, isLoading, isSuccess, isError, error } = useQuery({
    queryKey: ["note", search, currentPage],
    queryFn: () => fetchNotes({ search: search, page: currentPage }),
    placeholderData: keepPreviousData,
  });
  const totalPages = data?.totalPages ?? 0;
  useEffect(() => {
    if (isSuccess === true && data.notes.length === 0) {
      toast("No notes were found for your search.");
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError === true && error !== undefined) {
      toast.error(error.message);
    }
  }, [isError, error]);
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
      {isLoading && <Loader />}
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
