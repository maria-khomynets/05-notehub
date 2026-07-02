import { useMutation, useQueryClient } from "@tanstack/react-query";
import NoteList from "../NoteList/NoteList";
import SearchBox from "../SearchBox/SearchBox";

import css from "./App.module.css";
import { createNote, queryKey } from "../../services/noteService";
export default function App() {
  const queryClient = useQueryClient();
  const createMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox />
        <button className={css.button}>Create note +</button>
      </header>
      <NoteList />
      {/* Пагінація */}
    </div>
  );
}
