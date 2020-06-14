import fs from "fs";
import path from "path";

export function getDirectoryData(directoryPath: string[]) {
  const directoryFullPath = path.join(process.cwd(), ...directoryPath);
  const directoryContents = fs.readdirSync(directoryFullPath);
  const fileNames = directoryContents.filter((name) => name.endsWith(".md"));
  const nonExtension = fileNames.map((fileName) => {
    return fileName.replace(/\.md$/, "");
  });
  const directoryNames = directoryContents.filter(
    (name) => !name.endsWith(".md")
  );

  return {
    fileNames: nonExtension,
    directoryNames: directoryNames,
  };
}
