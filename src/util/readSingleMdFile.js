import matter from "gray-matter";
import { promises as fs } from "fs";

export async function getDocByFilePath(filepath) {
  const fileContents = await fs.readFile(filepath, "utf8");
  const { data, content } = matter(fileContents);
  return { meta: data, content };
}
