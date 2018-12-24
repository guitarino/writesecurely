import { h, Component } from "preact";
import "./PasswordEntry.scss";
import { WriteSecurelyLogo } from "../WriteSecurelyLogo/WriteSecurelyLogo";
import { Spinner } from "../Spinner/Spinner";
import { KeyboardListener } from "../WindowListener/KeyboardListener";

export class PasswordEntry extends Component {
    render() {
        const { isPasswordValid } = this.state;
        const { status } = this.props;
        return (
            <div class="PasswordEntry">
                <div class="PasswordEntry__Content">
                    <div class="PasswordEntry__Explanation">
                        Choose a password or enter the password you have chosen previously.
                    </div>
                    <div class="PasswordEntry__InputContainer">
                        <WriteSecurelyLogo className='PasswordEntry__InputLogo' type="full-feather" />
                        <input class="PasswordEntry__Input" type="password" onInput={this.setPassword} value={this.state.password} ref={this.saveRef} />
                    </div>
                    {
                        !isPasswordValid || status === 'INCORRECT' ?

                        <div class="PasswordEntry__Error">
                            {
                                !isPasswordValid ?
                                'Password must have at least 1 letter' :

                                status === 'INCORRECT' ?
                                'The provided password is invalid' :

                                null
                            }
                        </div> :

                        null
                    }
                    <button class="PasswordEntry__Submit" onClick={
                        status !== 'VERIFYING' ?
                        this.onPasswordSubmit :
                        undefined
                    }>
                    {
                        status === 'VERIFYING' ?
                        <Spinner color="#333" height={12} /> :
                        [
                            'Submit',
                            <KeyboardListener keycode={13} listener={this.onPasswordSubmit} />
                        ]
                    }
                    </button>
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
        else {
            this.focusOnPasswordInput();
        }
    }

    checkPassword() {
        const isPasswordValid = (this.state.password.length > 0);
        this.setState(() => ({
            isPasswordValid
        }));
        return isPasswordValid;
    }

    saveRef = (ref) => {
        this.inputRef = ref;
    }

    focusOnPasswordInput() {
        if (this.inputRef) {
            this.inputRef.focus();
        }
    }

    componentDidMount() {
        this.focusOnPasswordInput();
    }
}