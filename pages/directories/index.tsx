import { GetStaticProps } from "next";
import { getDirectoryData } from "lib/directory";
import Layout from "components/layout";
import Head from "next/head";
import Link from "next/link";

export default function RootDirectory(props: { nowTime: string, directoryNames: string[] }) {
  return (
    <Layout>
      <Head>
        <title>ルートディレクトリ</title>
      </Head>
      <div className="title">{props.nowTime}</div>
      <div className="container is-fluid mt-4">
        <div className="title">ルートディレクトリ</div>
      </div>
      <div className="container is-fluid">
        <div className="columns">
          <div className="column">
            <section className="section">
              <nav className="panel">
                <p className="panel-heading">Directories</p>
                <ul>
                  {props.directoryNames.map((dirName) => (
                    <li className="panel-block" key={dirName}>
                      <span className="panel-icon">
                        <i className="fas fa-folder"></i>
                      </span>
                      <Link
                        href="/directories/[...directory]"
                        as={`/directories/${dirName}`}
                      >
                        <a>{dirName}</a>
                      </Link>
                      <br />
                    </li>
                  ))}
                </ul>
              </nav>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const directoryData = await getDirectoryData([""]);
  const jikan = new Date();

  //時・分・秒を取得する
  const hour = jikan.getHours();
  const minute = jikan.getMinutes();
  const second = jikan.getSeconds();
  const nowTime = hour + "時" + minute + "分" + second + "秒";

  return {
    props: {
      nowTime: nowTime,
      directoryNames: directoryData.directoryNames,
    },
    unstable_revalidate: 10,
  };
};
