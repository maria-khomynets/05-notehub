import { deleteNote, fetchNotes, queryKey } from "../../services/noteService";
import css from "./NoteList.module.css";

import {
  useQuery,
  useMutation,
  QueryClient,
  useQueryClient,
} from "@tanstack/react-query";

export default function NoteList() {
  const queryClient = useQueryClient();
  const { data, error, isLoading, isError, isSuccess } = useQuery({
    queryKey: [queryKey],
    queryFn: fetchNotes,
  });
  const mutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <ul className={css.list}>
      {data?.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <button
              disabled={mutation.isPending}
              onClick={() => mutation.mutate(note.id)}
              className={css.button}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
