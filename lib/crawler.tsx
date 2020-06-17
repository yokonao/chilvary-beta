import { toPosix } from "lib/converter";
import { fetchDirectoryContents } from "lib/s3";
import { FileSystemCredentials } from "aws-sdk";

async function listAllFilesAndDirectories() {
  const directoryArrayPaths: string[][] = [];
  const fileArrayPaths: string[][] = [];
  const queue: string[][] = [[""]]; //corresponding to root directory

  while (queue.length != 0) {
    const searchDirectory = queue.shift();
    const posixPath = toPosix(searchDirectory, "/");
    const directoryContents = await fetchDirectoryContents(posixPath);

    queue.concat(directoryContents.directories);
    directoryArrayPaths.concat(directoryContents.directories);
    fileArrayPaths.concat(directoryContents.files);
  }

  return {
    files: fileArrayPaths,
    directories: directoryArrayPaths,
  };
}

export async function listFileArrayPaths() {
  const files = (await listAllFilesAndDirectories()).files;
  return files.map((arrayPath) => {
    return {
      params: {
        id: arrayPath,
      },
    };
  });
}

export async function listDirectoryArrayPaths() {
  const directories = (await listAllFilesAndDirectories()).directories;
  return directories.map((arrayPath) => {
    return {
      params: {
        directory: arrayPath,
      },
    };
  });
}
