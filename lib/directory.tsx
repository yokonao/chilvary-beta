import fs from "fs";
import path from "path";
import matter from "gray-matter";
import remark from "remark";
import { fetchDirectoryContents, fetchFileContents } from "lib/s3";

export async function getDirectoryData(directoryPath: string[]) {
  let posixPath: string;
  if (directoryPath[0] == "") {
    posixPath = "";
  } else {
    posixPath = path.join(...directoryPath, "/");
  }
  const directoryContents = await fetchDirectoryContents(posixPath);
  const files = directoryContents.files;
  const result = files.map(async (file) => {
    const filePosixPath = path.join(...file) + ".md";
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

  const directories = directoryContents.directories;
  const directoryNames = directories.map((dir) => {
    return dir[dir.length - 1];
  });

  return {
    fileData: fileData,
    directoryNames: directoryNames,
  };
}
