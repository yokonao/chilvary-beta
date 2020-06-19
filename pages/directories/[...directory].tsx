import { GetStaticProps, GetStaticPaths } from "next";
import { getDirectoryData } from "lib/directory";
import Layout from "components/layout";
import Head from "next/head";
import Link from "next/link";
import path from "path";
import { listDirectoryArrayPaths } from "lib/crawler";
import { FileData } from "interfaces/file_data"

export default function Directory(props: {
  currentPath: string[];
  filesData: FileData[];
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
                  {props.filesData.map((data) => (
                    <li className="panel-block" key={data.fileName}>
                      <span className="panel-icon">
                        <i className="fas fa-file"></i>
                      </span>
                      <Link
                        href="/posts/[...id]"
                        as={`/posts/${posixCurrentPath}/${data.fileName}`}
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
          {props.filesData.map((data) => (
            <div className="column is-one-third-desktop is-half-tablet" key={data.fileName}>
              <div className="card fix-height">
                <div className="card-content">
                  <p className="title is-4">{data.title}</p>
                  <p>{data.description}</p>
                </div>
                <div className="has-text-justified fix-bottom">
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
  const arrayPaths = await listDirectoryArrayPaths();
  return {
    paths: arrayPaths,
    fallback: true,
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
      filesData: directoryData.filesData,
      directoryNames: directoryData.directoryNames,
    },
    unstable_revalidate: 30
  };
};
