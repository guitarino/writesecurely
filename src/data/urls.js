export const pages = {
    oauth_redirect: 'oauth_redirect',
    welcome_page: 'welcome_page',
    notebook_selection: 'notebook_selection',
    password_entry: 'password_entry',
}

export const passwordRequiredPages = [
    pages.notebook_selection,
]

export const urls = {
    password_entry: createPageUrl(pages.password_entry),
    notebook_selection: createPageUrl(pages.notebook_selection),
}

function createPageUrl(page) {
    return `/?page=${page}`;
}