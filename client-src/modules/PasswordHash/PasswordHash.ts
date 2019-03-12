import { PasswordHash as IPasswordHash } from "./PasswordHash.types";
import { observed, connect } from "../../type/connect";
import { sha256 } from "js-sha256";
import { dependency, inject } from "../../type/inject";
import { PasswordHashStorage } from "./PasswordHashStorage.types";
import { PasswordHashVerifier } from "./PasswordHashVerifier.types";

@dependency(IPasswordHash.singleton)
@inject(
    PasswordHashStorage,
    PasswordHashVerifier
)
class PasswordHash implements IPasswordHash {
    private readonly passwordHashStorage: PasswordHashStorage;
    private readonly passwordHashVerifier: PasswordHashVerifier;
    @observed public data: IPasswordHash['data'];

    constructor(passwordHashStorage, passwordHashVerifier) {
        this.passwordHashStorage = passwordHashStorage;
        this.passwordHashVerifier = passwordHashVerifier;
        this.data = this.getInitialStoredData();
        connect(this);
    }

    private getInitialStoredData(): IPasswordHash['data'] {
        const hash = this.passwordHashStorage.getHash();
        if (hash) {
            this.verifyAndSetHash(hash);
            return {
                status: 'verifying',
                hash
            }
        } else {
            return {
                status: 'not provided'
            }
        }
    }

    // TODO: Create password?
    setPassword(password: string) {
        if (this.data.status !== 'verifying') {
            const hash = sha256.array(password);
            this.data = {
                status: 'verifying',
                hash
            };
            this.verifyAndSetHash(hash);
        }
    }

    async verifyAndSetHash(hash: number[]) {
        try {
            const isHashValid = await this.passwordHashVerifier.isHashValid(hash);
            if (isHashValid) {
                this.data = {
                    status: 'verified',
                    hash
                };
            } else {
                this.data = {
                    status: 'error',
                    error: 'Password is invalid',
                    errorDescription: 'Provided password is invalid'
                };
            }
        }
        catch (error) {
            this.data = {
                status: 'error',
                error: 'Error while verifying password',
                errorDescription: error.toString()
            };
        }
    }
}