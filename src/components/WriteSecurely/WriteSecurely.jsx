import { h, Component } from "preact";
import "./WriteSecurely.scss";
import { WelcomePage } from "../WelcomePage";
import { pages } from "../../data/urls";
import { NotebookSelection } from "../NotebookSelection";
import { NotFoundPage } from "../NotFoundPage";
import { PasswordEntry } from "../PasswordEntry";

export function WriteSecurely({
    location,
    credentials
}) {
    const { searchQuery } = location;

    return (
        !searchQuery.page ||
        searchQuery.page === pages.welcome_page ||
        credentials.status === "not authenticated" ||
        credentials.status === "error" ?
        <WelcomePage /> :

        searchQuery.page === pages.password_entry ?
        <PasswordEntry /> :

        searchQuery.page === pages.notebook_selection ?
        <NotebookSelection /> :

        <NotFoundPage />
    );
}