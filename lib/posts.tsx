import path from "path";
import matter from "gray-matter";
import remark from "remark";
import html from "remark-html";
import { fetchFileContents } from "lib/s3";

export async function getPostData(id: string | string[]) {
  if ("string" === typeof id) {
    id += ".md";
    var fullPath = id;
  } else {
    id[id.length - 1] += ".md";
    var fullPath = path.join(...id);
  }
  // const fileContents = fs.readFileSync(fullPath, "utf8");
  console.log(fullPath)
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
    id,
    contentHtml,
    ...(matterResult.data as {
      title: string;
      author: string;
      description: string;
    }),
  };
}
