import { GetStaticProps, GetStaticPaths } from "next";
import { getDirectoryData } from "lib/directory";
import Layout from "components/layout";
import Head from "next/head";
import Link from "next/link";
import path from "path";
import { listDirectoryArrayPaths } from "lib/crawler";
import { FileData } from "interfaces/file_data";
import Directories from "components/directories";
import Files from "components/files";
import Cards from "components/cards";
import Breadcrumb from "components/breadcrumb"

export default function Directory(props: {
  currentPath: string[];
  filesData: FileData[];
  directoryNames: string[];
}) {
  const posixCurrentPath = path.join(...props.currentPath) + "/";
  return (
    <Layout>
      <Head>
        <title>{props.currentPath.slice(-1)[0]}</title>
      </Head>
      <Breadcrumb currentPath={props.currentPath}/>
      <div className="container is-fluid mt-4">
        <div className="title">{props.currentPath.slice(-1)[0]}</div>
      </div>
      <div className="container is-fluid">
        <div className="columns">
          <div className="column">
            <Files
              posixCurrentPath={posixCurrentPath}
              array={props.filesData}
            />
          </div>
          <div className="column">
            <Directories
              posixCurrentPath={posixCurrentPath}
              array={props.directoryNames}
            />
          </div>
        </div>
      </div>
      <Cards posixCurrentPath={posixCurrentPath} array={props.filesData} />
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const arrayPaths = await listDirectoryArrayPaths();
  return {
    paths: arrayPaths,
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
      filesData: directoryData.filesData,
      directoryNames: directoryData.directoryNames,
    },
  };
};
