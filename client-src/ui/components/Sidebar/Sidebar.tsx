import { h, Component, ComponentChildren, ComponentConstructor } from "preact";
import "./Sidebar.scss";
import { WriteSecurelyLabel, WriteSecurelyLogo } from "../WriteSecurelyLogo/WriteSecurelyLogo";
import { OptionalOf } from "../../types/OptionalOf";

export type SidebarProps = {
    className?: string,
    contentClassName?: string,
    children?: ComponentChildren,
    startWidth?: number,
    minWidth?: number,
    maxWidth?: number,
    fullLabelMinWidth?: number
}

type SidebarState = {
    isCollapsed: boolean,
    width: number
}

class SidebarComponent extends Component<Required<SidebarProps>, SidebarState> {
    private dragStartPosition: number;
    private dragStartWidth: number;

    static defaultProps: OptionalOf<SidebarProps> = {
        children: null,
        className: '',
        contentClassName: '',
        startWidth: 268,
        minWidth: 150,
        maxWidth: Infinity,
        fullLabelMinWidth: 140
    }
    
    componentWillMount() {
        this.state = {
            isCollapsed: false,
            width: this.props.startWidth
        }
    }

    render() {
        const { className, children, contentClassName, fullLabelMinWidth } = this.props;
        const { isCollapsed, width } = this.state;
        const isLabelShown = !isCollapsed || (width < fullLabelMinWidth);

        return (
            <aside
                class={`Sidebar ${isCollapsed ? `Sidebar--Collapsed` : ``} ${className}`}
                style={!isCollapsed ? {
                    width: `${width}px`
                } : {}}
            >
                <button class="Sidebar__ExpandCollapseButton" onClick={this.toggleCollapse}>
                    {
                        isLabelShown ?
                        <WriteSecurelyLabel hasLogo /> :
                        <WriteSecurelyLogo />
                    }
                </button>
                {
                    !isCollapsed ?
                    <div class={`Sidebar__Content ${contentClassName}`}>
                        {children}
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
        const maxWidth = this.props.maxWidth;
        const minWidth = this.props.minWidth;
        if (desiredWidth > maxWidth) {
            return maxWidth;
        }
        if (desiredWidth < minWidth) {
            return minWidth;
        }
        return desiredWidth;
    }
}

export const Sidebar = SidebarComponent as ComponentConstructor<SidebarProps, SidebarState>;