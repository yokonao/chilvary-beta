import Layout from "components/layout";
import { getPostData } from "lib/posts";
import Head from "next/head";
import { GetStaticProps, GetStaticPaths } from "next";
import { listFileArrayPaths } from "lib/crawler";
import { PostData } from "interfaces/post_data";
import Breadcrumb from "components/breadcrumb"

export default function Post(props: {
  currentPath: string[];
  postData: PostData;
}) {
  return (
    <Layout>
      <Head>
        <title>{props.postData.title || ""}</title>
      </Head>
      <Breadcrumb currentPath={props.currentPath}/>
      <div className="container is-fluid">
        <div className="columns">
          <div className="column is-10-tablet is-offset-1-tablet is-8-desktop is-offset-2-desktop">
            <div
              dangerouslySetInnerHTML={{ __html: props.postData.contentHtml }}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await listFileArrayPaths();
  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if ("string" === typeof params.id) {
    params.id = [params.id];
  }
  const postData = await getPostData(params.id);
  return {
    props: {
      currentPath: params.id,
      postData: postData,
    },
  };
};
