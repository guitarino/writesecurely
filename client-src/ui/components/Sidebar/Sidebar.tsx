import { h, Component, ComponentChildren } from "preact";
import "./Sidebar.scss";

export type SidebarProps = {
    className?: string,
    children?: ComponentChildren,
    startWidth?: number,
    minWidth?: number,
    maxWidth?: number
};

type SidebarState = {
    width: number
}

export class Sidebar extends Component<SidebarProps, SidebarState> {
    private dragStartPosition: number;
    private dragStartWidth: number;

    static defaultProps = {
        startWidth: 268,
        minWidth: 150,
        maxWidth: 450
    }
    
    componentWillMount() {
        this.state = {
            width: this.props.startWidth as number
        }
    }

    render() {
        const { className, children } = this.props;
        const { width } = this.state;

        return (
            <aside
                class={`Sidebar ${className}`}
                style={{
                    width: `${width}px`
                }}
            >
                {children || null}
                <span
                    class="Sidebar__DraggableEdge"
                    onMouseDown={this.onDragEdgeStart}
                />
            </aside>
        )
    }

    onDragEdgeStart = (e: MouseEvent) => {
        this.dragStartPosition = e.pageX;
        this.dragStartWidth = this.state.width;
        this.addDragMouseListeners();
    }

    onDragEdgeEnd = () => {
        this.removeDragMouseListeners();
    }

    addDragMouseListeners() {
        window.addEventListener('mousemove', this.onDragEdgeMove);
        window.addEventListener('mouseup', this.onDragEdgeEnd);
    }

    removeDragMouseListeners() {
        window.removeEventListener('mousemove', this.onDragEdgeMove);
        window.removeEventListener('mouseup', this.onDragEdgeEnd);
    }

    onDragEdgeMove = (e: MouseEvent) => {
        const delta = e.pageX - this.dragStartPosition;
        this.setState({
            width: this.capWidthBetweenMinAndMax(this.dragStartWidth + delta)
        });
    }

    capWidthBetweenMinAndMax(desiredWidth: number): number {
        const maxWidth = this.props.maxWidth as number;
        const minWidth = this.props.minWidth as number;
        if (desiredWidth > maxWidth) {
            return maxWidth;
        }
        if (desiredWidth < minWidth) {
            return minWidth;
        }
        return desiredWidth;
    }
}