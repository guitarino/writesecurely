import { PasswordHashVerifier } from "../../PasswordHash/PasswordHashVerifier.types";
import { dependency } from "../../../type/inject";

@dependency(PasswordHashVerifier.singleton)
class GitlabPasswordHashVerifier implements PasswordHashVerifier {
    async isHashValid(hash: number[]): Promise<boolean> {

    }
}