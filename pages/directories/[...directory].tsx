import { GetStaticProps, GetStaticPaths } from "next";
import { getDirectoryData } from "lib/directory";
import Layout from "components/layout";
import Head from "next/head";
import Link from "next/link";
import path from "path";
import { getDirectoryPathArray } from "../../lib/crawler";
import { fetchDirectoryContents } from "lib/s3";

export default function Directory(props: {
  currentPath: string[];
  fileData: {
    title: string;
    author: string;
    description: string;
    fileName: string;
  }[];
  directoryNames: string[];
}) {
  const posixCurrentPath = path.join(...props.currentPath);
  return (
    <Layout>
      <Head>
        <title>{props.currentPath.slice(-1)[0]}</title>
      </Head>
      <div className="container is-fluid mt-4">
        <div className="title">{props.currentPath.slice(-1)[0]}</div>
      </div>
      <div className="container is-fluid">
        <div className="columns">
          <div className="column">
            <section className="section">
              <nav className="panel">
                <p className="panel-heading">Files</p>
                <ul>
                  {props.fileData.map((data) => (
                    <li className="panel-block" key={data.fileName}>
                      <span className="panel-icon">
                        <i className="fas fa-file"></i>
                      </span>
                      <Link
                        href="/posts/[...id]"
                        as={`/${posixCurrentPath}/${data.fileName}`}
                      >
                        <a>{data.title}</a>
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

      <div className="container is-fluid px-4 py-4">
        <div className="columns is-multiline is-vcentered">
          {props.fileData.map((data) => (
            <div className="column is-one-third-desktop is-half-tablet">
              <div className="card">
                <div className="card-content">
                  <p className="title">{data.title}</p>
                  <p>{data.description}</p>
                </div>
                <div className="card-footer has-text-justified">
                  <Link
                    href="/posts/[...id]"
                    as={`/posts/${posixCurrentPath}/${data.fileName}`}
                  >
                    <a className="button is-fullwidth is-large is-link">View</a>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getDirectoryPathArray();
  paths.shift()
  paths.map(path => {
    console.log(path.params.directory)
  })
  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if ("string" === typeof params.directory) {
    params.directory = [params.directory];
  }
  const directoryData = await getDirectoryData(params.directory);
  return {
    props: {
      currentPath: params.directory,
      fileData: directoryData.fileData,
      directoryNames: directoryData.directoryNames,
    },
  };
};
