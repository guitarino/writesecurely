import { PasswordHashStorage as IPasswordHashStorage } from './PasswordHashStorage.types';
import { dependency } from '../../type/inject';

@dependency(IPasswordHashStorage)
class PasswordHashStorage implements IPasswordHashStorage {
    getHash(): number[] | null {
        const storedHash = window.localStorage.getItem('passwordHash');
        if (storedHash) {
            return JSON.parse(storedHash);
        }
        return null;
    }

    setHash(passwordHash: number[]) {
        window.localStorage.setItem('passwordHash', JSON.stringify(passwordHash));
    }

    clearHash() {
        window.localStorage.removeItem('passwordHash');
    }
}