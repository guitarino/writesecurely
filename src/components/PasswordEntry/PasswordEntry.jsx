import { h, Component } from "preact";

import "./PasswordEntry.scss";
import { WriteSecurelyLogo } from "../WriteSecurelyLogo/WriteSecurelyLogo";

export class PasswordEntry extends Component {
    render() {
        return (
            <div class="PasswordEntry">
                <div class="PasswordEntry__Content">
                    <div class="PasswordEntry__Explanation">
                        Choose a password or enter the password you have chosen previously.
                    </div>
                    <div class="PasswordEntry__InputContainer">
                        <WriteSecurelyLogo className='PasswordEntry__InputLogo' type="2" />
                        <input class="PasswordEntry__Input" type="password" onInput={this.setPassword} value={this.state.password} />
                    </div>
                    {
                        !this.state.isPasswordValid ?
                        <div class="PasswordEntry__Error">
                            Password must have at least 1 letter
                        </div> :
                        null
                    }
                    <button class="PasswordEntry__Submit" onClick={this.onPasswordSubmit}>Submit</button>
                </div>
            </div>
        )
    }

    componentWillMount() {
        this.state = {
            isPasswordValid: true,
            password: ""
        };
    }

    setPassword = ({ target }) => {
        this.setState(() => ({
            password: target.value
        }));
    }

    onPasswordSubmit = () => {
        if (this.checkPassword()) {
            this.props.setPassword(this.state.password);
        }
    }

    checkPassword() {
        const isPasswordValid = (this.state.password.length > 0);
        this.setState(() => ({
            isPasswordValid
        }));
        return isPasswordValid;
    }
}