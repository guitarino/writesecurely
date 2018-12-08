import { h } from "preact";
import "./DiarySelection.scss";
import { WriteSecurelyLabel } from "../WriteSecurelyLogo/WriteSecurelyLogo";
import { encrypt, getHash, decrypt } from "../../crypto-worker";

export class DiarySelection {
    render() {
        console.log(this.props.diaries);
        
        return (
            <div class="DiarySelection">
                <div class="DiarySelection__Content">
                    <DiaryBook title="+" />
                    <DiaryBook title="Personal diary" />
                    <DiaryBook title="Poetry book" />
                    <DiaryBook title="Diary for ideas" />
                    <DiaryBook title="Secret wishes" />
                </div>
            </div>
        );
    }

    componentWillMount() {
        this.props.fetchDiaries();
    }
}

export function DiaryBook({ title }) {
    return (
        <div class="DiaryBook">
            <div class="DiaryBook__Title">
                { title }
            </div>
        </div>
    )
}