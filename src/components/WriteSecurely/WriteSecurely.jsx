import { h, Component } from "preact";
import "./WriteSecurely.scss";
import oauth from "../../../config/dev.oauth.json";

let counter = 0;
let searchCounter = 0;

/*
    type props = {
        location: {
            href: string,
            host: string,
            pathname: string,
            search: string,
            hash: string,
        },
        push: (url: string) => any,
        replace: (url: string) => any,
        go: (steps: number) => any,
        goBack: () => any,
        goForward: () => any,
        redirect: (url: string) => any
    };
*/

export class WriteSecurely extends Component {
    render() {
        return (
            <div class="WriteSecurely">
                <div class="WriteSecurely__greeting">Hello World!</div>
                <div class="WriteSecurely__message">Preact confirmed.</div>
                <pre>{JSON.stringify(this.props.location, null, 4)}</pre>
                <div><button onClick={() => this.props.push('/' + counter++)}>Push</button></div>
                <div><button onClick={() => this.props.replace('/' + counter++)}>Replace</button></div>
                <div><button onClick={() => this.props.go(-2)}>Go -2</button></div>
                <div><button onClick={() => this.props.go(-1)}>Go -1</button></div>
                <div><button onClick={() => this.props.go(+1)}>Go +1</button></div>
                <div><button onClick={() => this.props.go(+2)}>Go +2</button></div>
                <div><button onClick={() => this.props.goBack()}>Go back</button></div>
                <div><button onClick={() => this.props.goForward()}>Go forward</button></div>
                <div><button onClick={() => this.props.push('?page=' + searchCounter++ + '&test1=ab+cd&test2=%21%21%21')}>Push query</button></div>
                <div><button onClick={() => this.props.push('/?page=' + searchCounter++)}>Push with query</button></div>
                <div><button onClick={() => this.props.push('#page=' + searchCounter++ + '&test1=ab+cd&test2=%21%21%21')}>Push hash</button></div>
                <div><button onClick={() => this.props.push('/#page=' + searchCounter++)}>Push with hash</button></div>
                <div><button onClick={() => this.props.redirect(
                    `https://gitlab.com/oauth/authorize?client_id=${
                        encodeURIComponent(oauth.clientId)
                    }&redirect_uri=${
                        encodeURIComponent(oauth.redirectUri)
                    }&response_type=token`
                )}>Push test</button></div>
            </div>
        );
    }
}