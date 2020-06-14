import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Question Bank Notebook" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bulma@0.9.0/css/bulma.min.css"
        ></link>
        <script
          defer
          src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"
        ></script>
      </Head>
      <div className="hero is-dark is-fullheight is-bold">
        <div className="hero-body has-text-centered">
          <div className="container">
            <div className="title is-1 is-spaced">MDX2</div>
            <div className="subtitle is-3">
              MeDical notebooks using Mark Down
            </div>
            <Link href="/directories/posts">
              <a className="button is-dark is-outlined is-inverted is-large">
                Get Started
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
