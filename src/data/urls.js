export const pages = {
    welcome_page: 'welcome_page',
    diary_selection: 'diary_selection',
}

export const urls = {
    diary_selection: createPageUrl(pages.diary_selection),
}

function createPageUrl(page) {
    return `/?page=${page}`;
}