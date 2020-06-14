import { GetStaticProps, GetStaticPaths } from "next";
import { getDirectoryData } from "lib/directory";
import Layout from "components/layout";
import Head from "next/head";
import Link from "next/link";
import path from "path";
import { getDirectoryPathArray } from "../../lib/crawler";

export default function Directory(props: {
  currentPath: string[];
  fileNames: string[];
  directoryNames: string[];
}) {
  const posixCurrentPath = path.join(...props.currentPath);
  return (
    <Layout>
      <Head>
        <title>{props.currentPath}</title>
      </Head>
      <div className="container is-fluid">
        <div className="columns">
          <div className="column">
            <section className="section">
              <nav className="panel">
                <p className="panel-heading">Files</p>
                <ul>
                  {props.fileNames.map((fileName) => (
                    <li className="panel-block" key={fileName}>
                      <span className="panel-icon">
                        <i className="fas fa-file"></i>
                      </span>
                      <Link
                        href="/posts/[...id]"
                        as={`/${posixCurrentPath}/${fileName}`}
                      >
                        <a>{fileName}</a>
                      </Link>
                      <br />
                    </li>
                  ))}
                </ul>
              </nav>
            </section>
          </div>
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
                        as={`/directories/${posixCurrentPath}/${dirName}`}
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

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getDirectoryPathArray();
  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if ("string" === typeof params.directory) {
    params.directory = [params.directory];
  }
  const directoryData = getDirectoryData(params.directory);
  return {
    props: {
      currentPath: params.directory,
      fileNames: directoryData.fileNames,
      directoryNames: directoryData.directoryNames,
    },
  };
};
