import { h, Component } from "preact";
import "./WriteSecurely.scss";
import { WelcomePage } from "../WelcomePage";
import { pages } from "../../data/urls";
import { DiarySelection } from "../DiarySelection";
import { NotFoundPage } from "../NotFoundPage";

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

        searchQuery.page === pages.diary_selection ?
        <DiarySelection /> :

        <NotFoundPage />
    );
}