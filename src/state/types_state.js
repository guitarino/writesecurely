// export type AuthenticatedState = {
//     status: 'authenticated' | 'not authenticated',
//     token: string | null,
//     expiry: Date | null
// }

// export type DiaryState = {
//     id: number,
//     title: string,
//     password: PasswordState,
//     fontSize: number,
//     googleFontName: string,
//     entries: EntriesState
// }

// export type PasswordState = {
//     status: 'initial' | 'loading' | 'correct' | 'incorrect',
//     password: string | null,
//     salt: string
// }

// export type EntriesState = {
//     status: 'initial' | 'loading' | 'loaded' | 'error',
//     list: Array<EntryState> | null
// }

// export type EntryState = {
//     status: 'initial' | 'loading' | 'loaded' | 'error',
//     title: string,
//     text: string | null,
//     modifiedText: string | null
// }

// export type State = {
//     pwd: PasswordState,
//     auth: AuthenticatedState,
//     diaries: Array<DiaryState>
// }