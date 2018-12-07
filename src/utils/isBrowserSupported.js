export function isBrowserSupported() {
    return !!(window.fetch && window.Worker);
};