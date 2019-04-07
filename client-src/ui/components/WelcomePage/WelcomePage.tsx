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
        <main className="WelcomePage">
            <article className="WelcomePage__WelcomeCard">
                <section className="WelcomePage__Header"><WriteSecurelyLabel hasLogo /></section>
                <section className="WelcomePage__Information">
                    <p><WriteSecurelyLabel /> is a private note-taking web application.</p>
                    <p>It allows you to create your own private notebooks and write encrypted notes.</p>
                </section>
                <section className="WelcomePage__HowSection">
                    <p className="WelcomePage__How">How does it work?</p>
                    <ol className="WelcomePage__HowList">
                        <li className="WelcomePage__HowListItem">Sign in via GitLab. GitLab is a service that allows you to create private / public repositories and store content inside of them.</li>
                        <li className="WelcomePage__HowListItem">Create a notebook and choose a password for it. Nobody will be able to read the contents of the notebook without knowing the password.</li>
                        <li className="WelcomePage__HowListItem">Create, edit and delete private notes, create and customize multiple notebooks.</li>
                    </ol>
                </section>
                {
                    error ?
                    <section className="WelcomePage__CredentialsError">
                        Error: {error}. {errorDescription}
                    </section> :
                    null
                }
                <button className="WelcomePage__LoginButton" onClick={login}>
                    Login via GitLab
                </button>
            </article>
        </main>
    );
}