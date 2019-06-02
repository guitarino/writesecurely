import { configureDependency } from "../../type/inject";
import { PasswordVerification as IPasswordVerification } from "./PasswordVerification.types";
import { PasswordVerification } from "./PasswordVerification.impl";
import { connect } from "typeconnect";

configureDependency()
    .implements(IPasswordVerification)
    .create(connect(PasswordVerification));