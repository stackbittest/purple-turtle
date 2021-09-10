import path from "path";
import glob from "glob";
import { promises as fs } from "fs";

const contentSource = ["src/content/advanced", "src/content/basic"];
const files = contentSource.reduce((acc, src) => {
  // using process.cwd() based on next.js documentation
  // https://nextjs.org/docs/basic-features/data-fetching#reading-files-use-processcwd
  const contentGlob = `${path.join(process.cwd(), src)}/**/*.md`;
  const files = glob.sync(contentGlob);
  return [...acc, ...files];
}, []);

export async function getMdRootStaticPaths() {
  if (!files.length) return [];
  const paths = await Promise.all(
    files.map(async (filepath) => {
      // get file name and use as slug
      const slug = filepath
        .replace(/^.*[\\\/]/, "")
        .replace(new RegExp(`${path.extname(filepath)}$`), "");
      const slugArray = slug === "index" ? [] : [slug];
      // get parent folder and use as template datapoint
      const myTemplate = path.dirname(filepath).replace(/^.*[\\\/]/, "");
      return {
        params: {
          rooturlslug: slugArray,
          templatetype: myTemplate,
          originalfilepath: filepath,
        },
      };
    })
  );
  return paths;
}
