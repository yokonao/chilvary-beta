import matter from "gray-matter";
import { fetchDirectoryContents, fetchFileContents } from "lib/s3";
import { toPosix } from "./converter";

export async function getDirectoryData(directoryPath: string[]) {
  const posixPath = toPosix(directoryPath, "/")
  const contents = await fetchDirectoryContents(posixPath);
  
  const result = contents.files.map(async (file) => {
    const filePosixPath = toPosix(file, ".md");
    const fileContents = await fetchFileContents(filePosixPath);
    const matterResult = matter(fileContents);

    return {
      fileName: file[file.length - 1],
      ...(matterResult.data as {
        title: string;
        author: string;
        description: string;
      }),
    };
  });
  const fileData = await Promise.all(result);

  const directoryNames = contents.directories.map((dir) => {
    return dir[dir.length - 1];
  });

  return {
    fileData: fileData,
    directoryNames: directoryNames,
  };
}
