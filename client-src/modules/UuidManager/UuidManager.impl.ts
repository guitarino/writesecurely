import { UuidManager as IUuidManager } from './UuidManager.types';

export class UuidManager implements IUuidManager {
    private createdUuids: Array<string> = [];

    create(): string {
        let random: number;
        let datetime: number;
        let uuid: string;
        do {
            random = Math.random() * 10;
            datetime = +(new Date());
            uuid = ('' + random).replace('.', '') +
                   '_' +
                   ('' + datetime);
        }
        while (this.createdUuids.indexOf(uuid) >= 0);
        this.createdUuids.push(uuid);
        return uuid;
    }
}