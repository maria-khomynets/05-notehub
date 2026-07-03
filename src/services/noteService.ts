import axios from "axios";
import type { Note, CreateNote } from "../types/note";
export const queryKey = "noteKey";
axios.defaults.baseURL = "https://notehub-public.goit.study/api/";
interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}
const notesToken = `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`;
export async function fetchNotes(search: string): Promise<FetchNotesResponse> {
  const res = await axios.get<Note[]>("/notes", {
    params: {
      search,
    },
  });
  return res.data;
}

export async function createNote({ title, content, tag }: CreateNote) {
  console.log(title, content, tag);
}
export async function deleteNote(id: string) {
  return id;
}
