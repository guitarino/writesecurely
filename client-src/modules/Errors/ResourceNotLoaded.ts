export class ResourceNotLoaded extends Error {
    constructor() {
        super("Resource is not loaded yet");
    }
}