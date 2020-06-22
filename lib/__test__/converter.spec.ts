import { toPosix } from "../converter";

test("toPosix", () => {
  expect(toPosix(["dirA", "dirB", "dirC"], "/")).toEqual("dirA/dirB/dirC/");
  expect(toPosix(["dirA", "dirB", "file"], ".md")).toEqual("dirA/dirB/file.md");
});
