import { h } from "preact";
import "./WriteSecurelyLogo.scss";

export function WriteSecurelyLabel({ hasLogo = true }) {
    return (
        <div class="WriteSecurelyLabel">
            Write{ hasLogo ? <WriteSecurelyLogo>&nbsp;</WriteSecurelyLogo> : " " }Securely
        </div>
    )
}

export function WriteSecurelyLogo({ children }) {
    return (
        <i class="WriteSecurelyLogo">{ children }</i>
    )
}