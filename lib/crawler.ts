import { toPosix } from "lib/converter";
import { fetchDirectoryContents } from "lib/s3";
import { FileSystemCredentials } from "aws-sdk";

async function listAllFilesAndDirectories() {
  let directoryArrayPaths: string[][] = [];
  let fileArrayPaths: string[][] = [];
  let queue: string[][] = [[""]]; //corresponding to root directory

  while (queue.length != 0) {
    const target = queue.shift();
    const posixPath = toPosix(target, "/");
    const directoryContents = await fetchDirectoryContents(posixPath);

    queue = [...queue, ...directoryContents.directories]
    directoryArrayPaths = [...directoryArrayPaths, ...directoryContents.directories]
    fileArrayPaths = [...fileArrayPaths, ...directoryContents.files]
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
