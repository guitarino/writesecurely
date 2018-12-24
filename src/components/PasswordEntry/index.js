import { PasswordEntry as PasswordEntryPresenter } from "./PasswordEntry";
import { connect } from "preact-redux";
import { setPassword } from "../../state/actions_hash";

function mapStateToProps(state) {
    return {
        status: state.hash.status
    }
}

export const PasswordEntry = connect(mapStateToProps, {
    setPassword
})(
    PasswordEntryPresenter
);