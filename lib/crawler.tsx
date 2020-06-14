import fs from "fs";
import path from "path";

function postsCrawler() {
  var directories: string[][];
  var filePathArray: string[][];
  filePathArray = [];
  const rootDirectory = ["posts"];
  // start from root directory, all article files are in posts directory
  directories = [rootDirectory];
  for (var dir of directories) {
    const currentDirectory = path.join(process.cwd(), ...dir);
    const directoryContents = fs.readdirSync(currentDirectory);
    const fileNames = directoryContents.filter((name) => name.endsWith(".md"));
    const newDirectories = directoryContents.filter(
      (name) => !name.endsWith(".md")
    );
    const newDirectoriesPaths = newDirectories.map((directoryName) => {
      return [...dir, directoryName];
    });
    for (var newDir of newDirectoriesPaths) {
      directories.push(newDir);
    }
    const filePaths = fileNames.map((fileName) => {
      const filePath = [...dir, fileName.replace(/\.md$/, "")];
      // remove root path("posts") from file path
      filePath.shift();
      return filePath;
    });
    filePathArray = [...filePathArray, ...filePaths];
  }
  return {
    files: filePathArray,
    directories: directories,
  };
}

export function getFilePathArray() {
  return postsCrawler().files.map((filePath) => {
    return {
      params: {
        id: filePath,
      },
    };
  });
}

export function getDirectoryPathArray() {
  return postsCrawler().directories.map((dirPath) => {
    return {
      params: {
        directory: dirPath,
      },
    };
  });
}
