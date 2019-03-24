export type Notebook = {
    id: string,
    title: string,
    description?: string
}

export interface Notebooks {
    getNotebooks(): Notebook[],
}