import { h, render } from "preact";
import { WriteSecurely as WriteSecurelyStateless } from "./WriteSecurely";
import { Provider, connect } from "preact-redux";
import { store } from "../../state/store";
import { push, replace, goBack, go, goForward, redirect } from "../../state/actions_history";

function mapStateToProps(state) {
    return {
        location: state.location,
    }
}

const mapDispatchToProps = {
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    redirect: redirect,
};

const WriteSecurely = connect(
    mapStateToProps,
    mapDispatchToProps
)(
    WriteSecurelyStateless
);

export function renderAt(element) {
    render(
        <Provider store={store}>
            <WriteSecurely />
        </Provider>,
        element
    );
}