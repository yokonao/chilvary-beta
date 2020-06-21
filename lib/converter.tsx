import path from "path";

export function toPosix(array: Readonly<string[]>, suffix: Readonly<string>) {
  if (array[0] == "") {
    return "";
  } else {
    return path.join(...array) + suffix;
  }
}

// convert PosixPath to ArrayPath
export function toArray(posix: Readonly<string>) {
  if (posix.endsWith("/")) {
    let array = posix.split("/");
    array.pop();
    return array;
  } else if (posix.endsWith(".md")) {
    const nonExtension = posix.replace(/\.md$/, "");
    return nonExtension.split("/");
  } else {
    return posix.split("/");
  }
}
