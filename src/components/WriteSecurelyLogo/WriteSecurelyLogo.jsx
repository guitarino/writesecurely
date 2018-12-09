import { h } from "preact";
import "./WriteSecurelyLogo.scss";

export function WriteSecurelyLabel({ hasLogo = true }) {
    return (
        <div class="WriteSecurelyLabel">
            Write{ hasLogo ? <WriteSecurelyLogo>&nbsp;</WriteSecurelyLogo> : " " }Securely
        </div>
    )
}

export function WriteSecurelyLogo({ children, className, type = 1 }) {
    return (
        <i class={`WriteSecurelyLogo WriteSecurelyLogo-${type} ${className}`}>{ children }</i>
    )
}