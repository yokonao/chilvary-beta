import Layout from "components/layout";
import { getPostData } from "lib/posts";
import Head from "next/head";
import { GetStaticProps, GetStaticPaths } from "next";
import { listFileArrayPaths } from "lib/crawler";

export default function Post({
  postData,
}: {
  postData: {
    title: string;
    author: string;
    description: string;
    contentHtml: string;
  };
  }) {
  console.log("in progress...")
  console.log(postData.description)
  return (
    <Layout>
      <Head>
        <title>{postData.title || ""}</title>
      </Head>
      <div className="container is-fluid">
        <div className="columns">
          <div className="column is-10-tablet is-offset-1-tablet is-8-desktop is-offset-2-desktop">
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
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
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
    unstable_revalidate: 30,
  };
};
