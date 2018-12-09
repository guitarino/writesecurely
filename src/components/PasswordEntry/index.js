import { PasswordEntry as PasswordEntryPresenter } from "./PasswordEntry";
import { connect } from "preact-redux";
import { setPassword } from "../../state/actions_hash";

export const PasswordEntry = connect(null, {
    setPassword
})(
    PasswordEntryPresenter
);