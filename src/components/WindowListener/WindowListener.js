import { Component } from "preact";

export class WindowListener extends Component {
    render() {
        return null;
    }

    addListeners(props) {
        if (props.type && props.listener) {
            window.addEventListener(props.type, props.listener, props.useCapture || props.options);
        }
    }

    removeListeners(props) {
        if (props.type && props.listener) {
            window.removeEventListener(props.type, props.listener, props.useCapture || props.options);
        }
    }

    componentDidMount() {
        this.addListeners(this.props);
    }

    componentWillReceiveProps(nextProps) {
        const propsChanged = nextProps.type !== this.props.type || nextProps.listener !== this.props.listener;
        if (propsChanged) {
            this.removeListeners(this.props);
            this.addListeners(nextProps);
        }
    }

    componentWillUnmount() {
        this.removeListeners(this.props);
    }
}