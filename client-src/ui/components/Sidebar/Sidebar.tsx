import { h, Component, ComponentChildren } from "preact";
import "./Sidebar.scss";
import { WriteSecurelyLabel, WriteSecurelyLogo } from "../WriteSecurelyLogo/WriteSecurelyLogo";

export type SidebarProps = {
    className?: string,
    contentClassName?: string,
    children?: ComponentChildren,
    startWidth?: number,
    minWidth?: number,
    maxWidth?: number
};

type SidebarState = {
    isCollapsed: boolean,
    width: number
}

export class Sidebar extends Component<SidebarProps, SidebarState> {
    private dragStartPosition: number;
    private dragStartWidth: number;

    static defaultProps = {
        className: '',
        contentClassName: '',
        startWidth: 268,
        minWidth: 150,
        maxWidth: Infinity
    }
    
    componentWillMount() {
        this.state = {
            isCollapsed: false,
            width: this.props.startWidth as number
        }
    }

    render() {
        const { className, children, contentClassName } = this.props;
        const { isCollapsed, width } = this.state;

        return (
            <aside
                class={`Sidebar ${isCollapsed ? `Sidebar--Collapsed` : ``} ${className}`}
                style={!isCollapsed ? {
                    width: `${width}px`
                } : {}}
            >
                <button class="Sidebar__ExpandCollapseButton" onClick={this.toggleCollapse}>
                    {
                        !isCollapsed ?
                        <WriteSecurelyLabel hasLogo /> :
                        <WriteSecurelyLogo />
                    }
                </button>
                {
                    !isCollapsed ?
                    <div class={`Sidebar__Content ${contentClassName}`}>
                        {children || null}
                    </div> :
                    null
                }
                {
                    !isCollapsed ?
                    <span
                        class="Sidebar__DraggableEdge"
                        onMouseDown={this.onDragEdgeStart}
                    /> :
                    null
                }
            </aside>
        )
    }

    toggleCollapse = () => {
        this.setState((state) => ({
            isCollapsed: !state.isCollapsed
        }));
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