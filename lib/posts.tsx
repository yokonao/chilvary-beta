import path from "path";
import matter from "gray-matter";
import remark from "remark";
import html from "remark-html";
import { fetchFileContents } from "lib/s3";
import { MetaData } from "interfaces/metadata";

export async function getPostData(id: Readonly<string | string[]>) {
  let fullPath: string;
  if ("string" === typeof id) {
    id += ".md";
    fullPath = id;
  } else {
    fullPath = path.join(...id) + ".md";
  }

  const fileContents = await fetchFileContents(fullPath);

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    contentHtml,
    ...(matterResult.data as MetaData),
  };
}
