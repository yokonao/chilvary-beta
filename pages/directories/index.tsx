import { GetStaticProps } from "next";
import { getDirectoryData } from "lib/directory";
import Layout from "components/layout";
import Head from "next/head";
import Link from "next/link";
import Directories from "components/directories"

export default function RootDirectory(props: { directoryNames: string[] }) {
  return (
    <Layout>
      <Head>
        <title>ルートディレクトリ</title>
      </Head>
      <div className="container is-fluid mt-4">
        <div className="title">ルートディレクトリ</div>
      </div>
      <div className="container is-fluid">
        <div className="columns">
          <div className="column">
            <Directories posixCurrentPath= "" array={props.directoryNames}/>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const directoryData = await getDirectoryData([""]);
  return {
    props: {
      directoryNames: directoryData.directoryNames,
    },
  };
};
