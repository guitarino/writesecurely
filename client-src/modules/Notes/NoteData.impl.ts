import { NoteData as INoteData, NoteStatus, NoteContentStatus } from './NoteData.types';
import { ObjectMap } from '../ObjectMap/ObjectMap';
import { Notebook } from '../Notebooks/Notebooks.types';
import { Note } from './Notes.types';

export class NoteData implements INoteData {
    data: INoteData['data'];

    constructor() {
        this.data = {
            noteMap: new ObjectMap<Notebook, NoteStatus>(),
            noteContentMap: new ObjectMap<Note, NoteContentStatus>()
        };
    }
}