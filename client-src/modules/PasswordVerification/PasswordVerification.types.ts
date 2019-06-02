import { ObjectMap } from "../ObjectMap/ObjectMap";
import { Notebook } from "../Notebooks/Notebooks.types";
import { type } from "../../type/inject";

export type PasswordVerificationStatus = {
    hash: Array<number>,
    status: 'Verified' |
        'Verifying' |
        'Wrong' |
        'Error Verifying' |
        'Not Verified' |
        'Not Created' |
        'Creating' |
        'Error Creating',
    errorMessage: string
}

export const PasswordVerification = type<PasswordVerification>();
export interface PasswordVerification {
    data: {
        hashStatusMap: ObjectMap<Notebook, PasswordVerificationStatus>
    }
}