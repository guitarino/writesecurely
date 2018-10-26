import { h, render } from "preact";
import { WriteSecurely as WriteSecurelyStateless } from "./WriteSecurely";
import { Provider, connect } from "preact-redux";
import { store } from "../../state/store";
import { push, replace, goBack, go, goForward } from "../../state/actions_history";
import { TState } from "../../state/types_state";

function mapStateToProps(state: TState) {
    return {
        location: state.location,
    }
}

function mapDispatchToProps() {
    return {
        push: push,
        replace: replace,
        go: go,
        goBack: goBack,
        goForward: goForward,
    }
}

const WriteSecurely = connect(
    mapStateToProps,
    mapDispatchToProps
)(
    WriteSecurelyStateless as any
);

export function renderAt(element: HTMLElement) {
    render(
        <Provider store={store}>
            <WriteSecurely />
        </Provider>,
        element
    );
}