import { h, Component } from "preact";
import "./WriteSecurely.scss";
import { TLocation, push, replace, go, goBack, goForward } from "../../state/actions_history";

export type WriteSecurelyProps = {
    location: TLocation,
    push: (url: string) => any,
    replace: (url: string) => any,
    go: (steps: number) => any,
    goBack: () => any,
    goForward: () => any,
}

export class WriteSecurely extends Component<WriteSecurelyProps, {}> {
    render() {
        return (
            <div class="WriteSecurely">
                <div class="WriteSecurely__greeting">Hello World!</div>
                <div class="WriteSecurely__message">Preact confirmed.</div>
            </div>
        );
    }
}