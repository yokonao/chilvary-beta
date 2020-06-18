import matter from "gray-matter";
import { fetchDirectoryContents, fetchFileContents } from "lib/s3";
import { toPosix } from "lib/converter";
import { MetaData } from "interfaces/metadata";
import { DirectoryData } from "interfaces/directory_data"

export async function getDirectoryData(directoryPath: string[]):Promise<DirectoryData> {
  const posixPath = toPosix(directoryPath, "/");
  const contents = await fetchDirectoryContents(posixPath);

  const result = contents.files.map(async (file) => {
    const filePosixPath = toPosix(file, ".md");
    const fileContents = await fetchFileContents(filePosixPath);
    const metadata = matter(fileContents).data as MetaData;

    return {
      fileName: file[file.length - 1],
      ...metadata,
    };
  });
  const filesData = await Promise.all(result);

  const directoryNames = contents.directories.map((dir) => {
    return dir[dir.length - 1];
  });

  return {
    filesData: filesData,
    directoryNames: directoryNames,
  };
}
