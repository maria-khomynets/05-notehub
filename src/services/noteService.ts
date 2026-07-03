import axios from "axios";
import type { Note, CreateNote } from "../types/note";
export const queryKey = "noteKey";
axios.defaults.baseURL = "https://notehub-public.goit.study/api/";
interface NotesHttpResponse {
  notes: Note[];
  totalPages: number;
}
interface FetchNotesParameters {
  search?: string;
  tag?: string;
  page?: number;
}
const perPage: number = 12;
const notesToken = `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`;
export async function fetchNotes({ search, page }: FetchNotesParameters) {
  const parameters = {
    params: {
      search: search,
      page: page,
      perPage: perPage,
    },
    headers: {
      Authorization: notesToken,
      accept: "application/json",
    },
  };

  const response = await axios.get<NotesHttpResponse>("/notes", parameters);

  return response.data;
}

export async function createNote(note: CreateNote) {
  const parameters = {
    headers: {
      Authorization: notesToken,
      accept: "application/json",
    },
  };

  const response = await axios.post<Note>("/notes", note, parameters);

  return response.data;
}
export async function deleteNote(id: string) {
  const parameters = {
    headers: {
      Authorization: notesToken,
      accept: "application/json",
    },
  };

  const response = await axios.delete<Note>(`/notes/${id}`, parameters);

  return response.data;
}
