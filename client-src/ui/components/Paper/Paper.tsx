import { h, Component, ComponentChildren } from "preact";
import { OptionalOf } from "../../../types/OptionalOf";
import "./Paper.scss";

export type PaperProps = {
    className?: string,
    children?: ComponentChildren
};

export class Paper extends Component<PaperProps> {
    static defaultProps: OptionalOf<PaperProps> = {
        className: '',
        children: null
    }

    render() {
        const { children, className } = this.props;
        return (
            <div className={`Paper ${className}`}>
                {children}
            </div>
        );
    }
}