import { h, Component } from "preact";
import "./WriteSecurely.scss";
import { WelcomePage } from "../WelcomePage";
import { pages } from "../../data/urls";
import { DiarySelection } from "../DiarySelection";
import { NotFoundPage } from "../NotFoundPage/NotFoundPage";

export function WriteSecurely({
    location,
    credentials
}) {
    const { searchQuery } = location;

    return (
        !searchQuery.page ||
        searchQuery.page === pages.main_page ||
        credentials.status === "not authenticated" ||
        credentials.status === "error" ?
        <WelcomePage /> :

        searchQuery.page === pages.diary_selection ?
        <DiarySelection /> :

        <NotFoundPage />
    );
}