import { PasswordVerification as IPasswordVerification, PasswordVerificationStatus } from './PasswordVerification.types';
import { ObjectMap } from '../ObjectMap/ObjectMap';
import { Notebook } from '../Notebooks/Notebooks.types';

export class PasswordVerification implements IPasswordVerification {
    data: IPasswordVerification['data'];

    constructor() {
        this.data = {
            hashStatusMap: new ObjectMap<Notebook, PasswordVerificationStatus>()
        }
    }
}