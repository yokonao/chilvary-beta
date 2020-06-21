import Head from "next/head";
import Navbar from "components/navbar";

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
        <Navbar />
      </header>
      <main>{children}</main>
    </div>
  );
}
