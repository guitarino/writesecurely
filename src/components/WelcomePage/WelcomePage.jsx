import { h } from "preact";
import "./WelcomePage.scss";

export function WelcomePage({
    credentials,
    login
}) {
    return (
        <main class="WelcomePage">
            <article class="WelcomePage__WelcomeCard">
                <section class="WelcomePage__Header">Welcome to WriteSecurely</section>
                <section class="WelcomePage__Information">
                    <p>WriteSecurely is a private note-taking web application.</p>
                    <p>It allows you to create your own private diary and write encrypted notes.</p>
                </section>
                <section class="WelcomePage__HowSection">
                    <p class="WelcomePage__How">How does it work?</p>
                    <ol class="WelcomePage__HowList">
                        <li class="WelcomePage__HowListItem">Sign in via GitLab. GitLab is a service that allows you to create private / public repositories and store content inside them.</li>
                        <li class="WelcomePage__HowListItem">Create a private diary and choose a password for it.</li>
                        <li class="WelcomePage__HowListItem">This will allow you to create entries in your diary, as well as delete or change old entries.</li>
                    </ol>
                </section>
                {
                    credentials.error ?
                    <section class="WelcomePage__CredentialsError">
                        Error: {credentials.error}. {credentials.errorDescription}
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