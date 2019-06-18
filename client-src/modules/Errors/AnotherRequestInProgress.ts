export class AnotherRequestInProgress extends Error {
    constructor() {
        super('A conflicting request is already in progress');
    }
}