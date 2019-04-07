import { h, ComponentChildren } from "preact";
import "./WriteSecurelyLogo.scss";

export type WriteSecurelyLabelProps = {
    hasLogo?: boolean,
}

export function WriteSecurelyLabel({ hasLogo = false }: WriteSecurelyLabelProps) {
    return (
        <div className="WriteSecurelyLabel">
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
    children?: ComponentChildren,
    className?: string,
    type?: string
}

export function WriteSecurelyLogo({ children = null, className = '', type }: WriteSecurelyLogoProps) {
    return (
        <i className={
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