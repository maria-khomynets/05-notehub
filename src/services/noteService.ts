//import axios from "axios";
import mock from "../components/mock.json";
import type { CreateNote } from "../types/note";
export const queryKey = "noteKey";
export async function fetchNotes() {
  return mock;
}
export async function createNote({ title, content, tag }: CreateNote) {
  console.log(title, content, tag);
}
export async function deleteNote(id: string) {
  return id;
}
