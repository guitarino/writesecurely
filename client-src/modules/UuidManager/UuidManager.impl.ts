import { UuidManager as IUuidManager } from './UuidManager.types';

export class UuidManager implements IUuidManager {
    private charlength: number = 32;
    private base: number = 36;
    private createdUuids: Array<string> = [];

    create(): string {
        let uuid: string;
        do {
            uuid = this.createRandomPhrase();
        }
        while (this.createdUuids.indexOf(uuid) >= 0);
        this.createdUuids.push(uuid);
        return uuid;
    }

    createRandomPhrase() {
        let phrase = '';
        for (let i = 0; i < this.charlength; i++) {
            phrase += this.createRandomChar();
        }
        return phrase;
    }

    createRandomChar() {
        return (Math.floor(this.base * Math.random())).toString(this.base);
    }
}