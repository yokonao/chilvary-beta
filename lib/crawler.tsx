import path from "path";
import { fetchDirectoryContents } from "lib/s3";

async function postsCrawler() {
  var directoriesPathArray: string[][];
  var filePathArray: string[][];
  filePathArray = []; // start from root directory, all article files are in posts directory
  directoriesPathArray = [[""]];
  for (var dir of directoriesPathArray) {
    var posixPath: string;
    if (dir[0] == "") {
      posixPath = "";
    } else {
      posixPath = path.join(...dir, "/");
    }
    const directoryContents = await fetchDirectoryContents(posixPath);
    for (var newDir of directoryContents.directories) {
      directoriesPathArray.push(newDir);
    }
    filePathArray = [...filePathArray, ...directoryContents.files];
  }
  return {
    files: filePathArray,
    directories: directoriesPathArray,
  };
}
export async function getFilePathArray() {
  const files = (await postsCrawler()).files;
  return files.map((filePath) => {
    return {
      params: {
        id: filePath,
      },
    };
  });
}

export async function getDirectoryPathArray() {
  const directories = (await postsCrawler()).directories;
  return directories.map((dirPath) => {
    return {
      params: {
        directory: dirPath,
      },
    };
  });
}
