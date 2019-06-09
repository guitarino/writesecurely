export type Note = UserNote & {
    id: string,
    dateTimeCreated: string,
    dateTimeUpdated: string
}

export type UserNote = {
    title: string
}