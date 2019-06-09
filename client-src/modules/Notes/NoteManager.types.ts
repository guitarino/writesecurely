import { UserNote } from "./Notes.types";

export interface NoteManager {
    getNotes(notebookId: string): Promise<void>;
    addNote(notebookId: string, userNote: UserNote): Promise<void>;
    removeNote(notebookId: string, noteId: string): Promise<void>;
    updateNote(notebookId: string, noteId: string, userNote: UserNote): Promise<void>;
    getNoteContent(notebookId: string, noteId: string): Promise<void>;
    saveNoteContent(notebookId: string, noteId: string, content: string): Promise<void>;
}