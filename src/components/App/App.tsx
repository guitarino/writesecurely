import { h, Component } from "preact";
import "./App.scss";

export class App extends Component {
    render() {
        return (
            <div class="App">
                <div class="App__greeting">Hello World!</div>
                <div class="App__message">Preact confirmed.</div>
            </div>
        );
    }
}