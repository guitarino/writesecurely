import { h } from "preact";
import "./WriteSecurelyLogo.scss";

export function WriteSecurelyLabel({ hasLogo = true }) {
    return (
        <div class="WriteSecurelyLabel">
            Write{ hasLogo ? <WriteSecurelyLogo>&nbsp;</WriteSecurelyLogo> : " " }Securely
        </div>
    )
}

export function WriteSecurelyLogo({ children, className, type }) {
    return (
        <i class={`WriteSecurelyLogo ${
            type === "full-feather" ?
            "WriteSecurelyLogo__FullFeather" :
            ""
        } ${className}`}>{children}</i>
    )
}