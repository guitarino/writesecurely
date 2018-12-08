export const pages = {
    welcome_page: 'welcome_page',
    diary_selection: 'diary_selection',
    password_entry: 'password_entry',
}

export const urls = {
    password_entry: createPageUrl(pages.password_entry),
    diary_selection: createPageUrl(pages.diary_selection),
}

function createPageUrl(page) {
    return `/?page=${page}`;
}