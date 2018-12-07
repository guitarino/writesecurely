import { DiarySelection as DiarySelectionPresenter } from "./DiarySelection";
import { connect } from "preact-redux";
import { fetchDiaries } from "../../state/actions_diary";

export const DiarySelection = connect(
    function(state) {
        return {
            diaries: state.diaries
        }
    },
    {
        fetchDiaries
    }
)(DiarySelectionPresenter);