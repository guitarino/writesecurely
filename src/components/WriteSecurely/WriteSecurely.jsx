import { h, Component } from "preact";
import "./WriteSecurely.scss";
import { WelcomePage } from "../WelcomePage";

export function WriteSecurely({
    location,
    credentials
}) {
    return (
        credentials.status === "not authenticated" ||
        credentials.status === "error" ?
        <WelcomePage /> :
        <div>Write Securely</div>
    );
}