import { h, ComponentChildren } from "preact";
import "./WriteSecurelyLogo.scss";

export type WriteSecurelyLabelProps = {
    hasLogo?: boolean,
}

export function WriteSecurelyLabel({ hasLogo = true }: WriteSecurelyLabelProps) {
    return (
        <div class="WriteSecurelyLabel">
            Write{
                hasLogo ?

                <WriteSecurelyLogo>
                    &nbsp;
                </WriteSecurelyLogo> :

                " "
            }Securely
        </div>
    )
}

export type WriteSecurelyLogoProps = {
    children: ComponentChildren,
    className?: string,
    type?: string
}

export function WriteSecurelyLogo({ children = null, className = '', type }: WriteSecurelyLogoProps) {
    return (
        <i class={
            `WriteSecurelyLogo ${
                type === "full-feather" ?
                "WriteSecurelyLogo__FullFeather" :
                ""
            } ${
                className
            }`
        }>
            {children}
        </i>
    )
}