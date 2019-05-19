import { h, Component, ComponentChildren } from "preact";
import { OptionalOf } from "../../../types/OptionalOf";
import "./Paper.scss";

export type PaperProps = {
    className?: string,
    style?: JSX.HTMLAttributes['style'],
    children?: ComponentChildren
};

export class Paper extends Component<PaperProps> {
    static defaultProps: OptionalOf<PaperProps> = {
        style: {},
        className: '',
        children: null
    }

    render() {
        const { children, className, style } = this.props;
        return (
            <div className={`Paper ${className}`} style={style}>
                {children}
            </div>
        );
    }
}