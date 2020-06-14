import fs from "fs";
import path from "path";
import matter from "gray-matter";
import remark from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts");

export async function getPostData(id: string | string[]) {
  if ('string' === typeof id) {
    id += '.md'
    var fullPath = path.join(postsDirectory, id)
  } else {
    id[id.length-1] += '.md'
    var fullPath = path.join(postsDirectory, ...id);
  }
  const fileContents = fs.readFileSync(fullPath, "utf8");

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
    ...(matterResult.data as { title: string }),
  };
}
