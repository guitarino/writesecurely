import { h } from "preact";
import "./WelcomePage.scss";
import { WriteSecurelyLabel } from "../WriteSecurelyLogo/WriteSecurelyLogo";

export type WelcomePageProps = {
    login: (...args: any) => void,
    error?: string,
    errorDescription?: string
}

export function WelcomePage({
    login,
    error = '',
    errorDescription = ''
}: WelcomePageProps) {
    return (
        <main class="WelcomePage">
            <article class="WelcomePage__WelcomeCard">
                <section class="WelcomePage__Header"><WriteSecurelyLabel /></section>
                <section class="WelcomePage__Information">
                    <p><WriteSecurelyLabel hasLogo={false} /> is a private note-taking web application.</p>
                    <p>It allows you to create your own private notebooks and write encrypted notes.</p>
                </section>
                <section class="WelcomePage__HowSection">
                    <p class="WelcomePage__How">How does it work?</p>
                    <ol class="WelcomePage__HowList">
                        <li class="WelcomePage__HowListItem">Sign in via GitLab. GitLab is a service that allows you to create private / public repositories and store content inside of them.</li>
                        <li class="WelcomePage__HowListItem">Choose a password used to encrypt notebooks and notes with AES-256 encryption.</li>
                        <li class="WelcomePage__HowListItem">Create, edit and delete private notes, create and customize multiple notebooks. Nobody will be able to read your notebook without knowing the chosen password.</li>
                    </ol>
                </section>
                {
                    error ?
                    <section class="WelcomePage__CredentialsError">
                        Error: {error}. {errorDescription}
                    </section> :
                    null
                }
                <button class="WelcomePage__LoginButton" onClick={login}>
                    Login via GitLab
                </button>
            </article>
        </main>
    );
}