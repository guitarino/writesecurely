import { configureDependency } from "../../type/inject";
import { PasswordVerificationManager as IPasswordVerificationManager } from "./PasswordVerificationManager.types";
import { PasswordVerification } from "./PasswordVerification.types";
import { NotebookData } from "../Notebooks/NotebookData.types";
import { Filesystem } from "../Filesystem/Filesystem.types";
import { FilesystemSpecification } from "../FilesystemSpecification/FilesystemSpecification.types";
import { Crypter } from "../Crypter/Crypter.types";
import { PasswordVerificationManager } from "./PasswordVerificationManager.impl";

configureDependency()
    .implements(IPasswordVerificationManager)
    .inject(PasswordVerification, NotebookData, Filesystem, FilesystemSpecification, Crypter)
    .create(PasswordVerificationManager);