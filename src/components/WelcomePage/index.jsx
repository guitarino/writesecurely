import { connect } from "preact-redux";
import { login } from "../../state/actions_gitlab";
import { WelcomePage as WelcomePagePresenter } from "./WelcomePage";

function mapStateToProps(state) {
    return {
        credentials: state.credentials
    }
}

const mapDispatchToProps = {
    login: login
}

export const WelcomePage = connect(mapStateToProps, mapDispatchToProps)(WelcomePagePresenter);