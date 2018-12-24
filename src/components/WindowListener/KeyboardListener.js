import { h, Component } from "preact";
import { WindowListener } from "./WindowListener";

export class KeyboardListener extends Component {
    render() {
        return <WindowListener type="keypress" listener={this.onKeyPress} />;
    }

    onKeyPress = (e) => {
        const keycode = e.which || e.keyCode;
        if (this.props.keycode && this.props.listener && keycode === this.props.keycode) {
            this.props.listener(keycode);
        }
    }
}