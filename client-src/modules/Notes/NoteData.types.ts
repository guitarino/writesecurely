import { ObjectMap } from "../ObjectMap/ObjectMap";
import { Notebook } from "../Notebooks/Notebooks.types";
import { Note } from "./Notes.types";

export type NoteStatus = {
    status: 
        'Not Loaded' |
        'Loading' |
        'Loaded' |
        'Error Loading' |
        'Adding' |
        'Error Adding' |
        'Deleting' |
        'Error Deleting' |
        'Updating' |
        'Error Updating',
    notes: Array<Note>,
    errorMessage: string
}

export type NoteContentStatus = {
    status:
        'Not Loaded' |
        'Loading' |
        'Loaded' |
        'Error Loading' |
        'Not Created' |
        'Updating' |
        'Error Updating',
    content: string,
    errorMessage: string
}

export interface NoteData {
    data: {
        noteMap: ObjectMap<Notebook, NoteStatus>,
        noteContentMap: ObjectMap<Note, NoteContentStatus>
    }
}