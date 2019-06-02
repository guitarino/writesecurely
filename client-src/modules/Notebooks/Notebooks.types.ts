export type Notebook = UserNotebook & {
    id: string,
    dateTimeCreated: string
}

export type UserNotebook = {
    title: string,
    description?: string
}