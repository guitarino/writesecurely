import { h, render } from "preact";
import { WriteSecurely as WriteSecurelyPresenter } from "./WriteSecurely";
import { Provider, connect } from "preact-redux";
import { store } from "../../state/store";
import "../../state/store_memoized";

function mapStateToProps(state) {
    return {
        location: state.location,
        credentials: state.credentials,
    }
}

export const WriteSecurely = connect(
    mapStateToProps
)(
    WriteSecurelyPresenter
);

export function renderAt(element) {
    render(
        <Provider store={store}>
            <WriteSecurely />
        </Provider>,
        element
    );
}