import { configureDependency } from "../../type/inject";
import { PasswordVerificationManager as IPasswordVerificationManager } from "./PasswordVerificationManager.types";
import { PasswordVerification } from "./PasswordVerification.types";
import { Filesystem } from "../Filesystem/Filesystem.types";
import { FilesystemSpecification } from "../FilesystemSpecification/FilesystemSpecification.types";
import { Crypter } from "../Crypter/Crypter.types";
import { PasswordVerificationManager } from "./PasswordVerificationManager.impl";
import { NotebookExistence } from "../Notebooks/NotebookExistence.types";

configureDependency()
    .implements(IPasswordVerificationManager)
    .inject(PasswordVerification, NotebookExistence, Filesystem, FilesystemSpecification, Crypter)
    .create(PasswordVerificationManager);