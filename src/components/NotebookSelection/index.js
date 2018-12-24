import { NotebookSelection as NotebookSelectionPresenter } from "./NotebookSelection";
import { connect } from "preact-redux";
import { fetchNotebooks } from "../../state/actions_notebook";

export const NotebookSelection = connect(
    function(state) {
        return {
            notebooks: state.notebooks
        }
    },
    {
        fetchNotebooks
    }
)(NotebookSelectionPresenter);