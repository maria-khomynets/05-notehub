import { useMutation, useQueryClient } from "@tanstack/react-query";
import NoteList from "../NoteList/NoteList";
import SearchBox from "../SearchBox/SearchBox";

import css from "./App.module.css";
import { createNote, queryKey } from "../../services/noteService";
import { useState } from "react";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
export default function App() {
  const [isModalOpen, setIsMpdalOpen] = useState<boolean>(false);
  const openModal = () => setIsMpdalOpen(true);
  const closeModal = () => setIsMpdalOpen(false);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox />
        <button onClick={openModal} className={css.button}>
          Create note +
        </button>
      </header>
      <NoteList />
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm />
        </Modal>
      )}
      {/* Пагінація */}
    </div>
  );
}
