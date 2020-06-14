import Head from "next/head";
import Link from "next/link";

export const siteTitle = "Next.js Sample Website";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
  home?: boolean;
}) {
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Deliver markdown files" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bulma@0.9.0/css/bulma.min.css"
        ></link>
        <script
          defer
          src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"
        ></script>
      </Head>
      <header>
        <div className="navbar is-dark is-bold">
          <div className="navbar-menu">
            <div className="navbar-start">
              <div className="navbar-item">
                <div className="button is-dark is-inverted">
                  <div>
                    <Link href="/">
                      <a>
                        <span className="icon has-text-dark">
                          <i className="fas fa-lg fa-home"></i>
                        </span>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main>
        {children}
      </main>
    </div>
  );
}
