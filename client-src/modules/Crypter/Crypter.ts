import { configureDependency } from "../../type/inject";
import { Crypter as ICrypter } from "./Crypter.types";
import { Crypter } from "./Crypter.impl";

configureDependency()
    .implements(ICrypter)
    .create(Crypter);