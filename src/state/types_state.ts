export type AuthenticatedState = {
    status: 'authenticated' | 'not authenticated',
    token: string | null,
    expiry: Date | null
}

export type PasswordState = {
    status: 'active' | 'inactive',
    password: string | null
}

export type DiaryState = {
    id: string,
    title: string,
    entries: EntriesState | null
}

export type EntriesState = {
    status: 'initial' | 'loading' | 'loaded' | 'error',
    list: Array<EntryState> | null
}

export type EntryState = {
    status: 'initial' | 'loading' | 'loaded' | 'error',
    title: string,
    text: string | null
}

export type State = {
    pwd: PasswordState,
    auth: AuthenticatedState,
    diaries: Array<DiaryState>
}