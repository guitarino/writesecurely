export const pages = {
    main_page: 'main_page',
    diary_selection: 'diary_selection',
}

export const urls = {
    diary_selection: createPageUrl(pages.diary_selection),
}

function createPageUrl(page) {
    return `/?page=${page}`;
}