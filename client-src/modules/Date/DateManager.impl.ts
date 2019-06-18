import { DateManager as IDateManager } from './DateManager.types';

export class DateManager implements IDateManager {
    public getCurrent(): string {
        return (new Date()).toISOString();
    }

    public parse(date: string): Date {
        return new Date(date);
    }
}