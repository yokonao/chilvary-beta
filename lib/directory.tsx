import fs from "fs";
import path from "path";
import matter from "gray-matter";
import remark from "remark";


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
  const fileData = fileNames.map((fileName) => {
    const filePath = path.join(directoryFullPath, fileName)
    const fileContents = fs.readFileSync(filePath, "utf8");
    const matterResult = matter(fileContents);
    return {
      fileName: fileName.replace(/\.md$/, ""),
      ...(matterResult.data as { title: string, author: string, description: string }),
    }
  })

  return {
    fileData: fileData,
    directoryNames: directoryNames,
  };
}
