import { NoteManager as INoteManager } from './NoteManager.types';
import { NoteData, NoteStatus, NoteContentStatus } from './NoteData.types';
import { NotebookExistence } from '../Notebooks/NotebookExistence.types';
import { Filesystem } from '../Filesystem/Filesystem.types';
import { FilesystemSpecification } from '../FilesystemSpecification/FilesystemSpecification.types';
import { Note } from './Notes.types';
import { Notebook } from '../Notebooks/Notebooks.types';
import { FileNotExist } from '../Errors/FileNotExist';

export class NoteManager implements INoteManager {
    private readonly noteData: NoteData;
    private readonly notebookExistence: NotebookExistence;
    private readonly filesystem: Filesystem;
    private readonly fileSpec: FilesystemSpecification;

    constructor(noteData: NoteData, notebookExistence: NotebookExistence, filesystem: Filesystem, fileSpec: FilesystemSpecification) {
        this.noteData = noteData;
        this.notebookExistence = notebookExistence;
        this.filesystem = filesystem;
        this.fileSpec = fileSpec;
    }

    async getNotes(notebookId: string) {
        const notebook = this.notebookExistence.getNotebookById(notebookId);
        this.setNoteStatus(notebook, {
            ...this.getNoteStatus(notebook),
            status: 'Loading'
        });
        try {
            const notes: Array<Note> = JSON.parse(
                await this.filesystem.getFileContent(this.fileSpec.getNotesFilePath(notebookId))
            );
            for (let i = 0; i < notes.length; i++) {
                this.populateNotLoadedNoteContentStatus(notes[i]);
            }
            this.setNoteStatus(notebook, {
                ...this.getNoteStatus(notebook),
                status: 'Loaded',
                notes
            });
        }
        catch (e) {
            if (e instanceof FileNotExist) {
                await this.filesystem.createFile(
                    this.fileSpec.getNotesFilePath(notebookId),
                    JSON.stringify([])
                );
                this.setNoteStatus(notebook, {
                    ...this.getNoteStatus(notebook),
                    status: 'Loaded',
                    notes: []
                });
            } else {
                this.setNoteStatus(notebook, {
                    ...this.getNoteStatus(notebook),
                    status: 'Error Loading',
                    errorMessage: e.toString()
                });
            }
        }
    }

    addNote()

    private populateNotLoadedNoteContentStatus(note: Note) {
        this.noteData.data.noteContentMap.set(note, {
            content: '',
            errorMessage: '',
            status: 'Not Loaded'
        });
    }

    private populateNotCreatedNoteContentStatus(note: Note) {
        this.noteData.data.noteContentMap.set(note, {
            content: '',
            errorMessage: '',
            status: 'Not Created'
        });
    }

    private setNoteStatus(notebook: Notebook, status: NoteStatus) {
        const { noteMap } = this.noteData.data;
        noteMap.set(notebook, status);
        this.noteData.data = {
            ...this.noteData.data,
            noteMap
        };
    }

    private getNoteStatus(notebook: Notebook): NoteStatus {
        return this.noteData.data.noteMap.get(notebook);
    }

    private setNoteContentStatus(note: Note, status: NoteContentStatus) {
        const { noteContentMap } = this.noteData.data;
        noteContentMap.set(note, status);
        this.noteData.data = {
            ...this.noteData.data,
            noteContentMap
        };
    }

    private getNoteContentStatus(note: Note): NoteContentStatus {
        return this.noteData.data.noteContentMap.get(note);
    }
}