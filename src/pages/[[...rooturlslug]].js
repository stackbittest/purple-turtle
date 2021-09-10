import React from "react";
import { readTokenFromFile, saveTokensToFile } from "../util/tokenFile";
import { getMdRootStaticPaths } from "../util/getRootContentMdFiles";
import { getDocByFilePath } from "../util/readSingleMdFile";
import mdRootTemplateTypeList from "../templates/indexMdRootContentTemplates";
import LayoutHello from "../templates/layoutHello";

export default function RootUrlPage(props) {
  let TemplateComponent = mdRootTemplateTypeList[props.meta.template];
  return (
    <LayoutHello>
      <TemplateComponent {...props}/>
    </LayoutHello>
  );
}

export async function getStaticProps(context) {
  // Props in the return value is a magic keyword -- I can't rename it to myStaticProps.
  // https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
  const { params } = context;
  if (!params) {
    return;
  }
  const tokentopass = !params.rooturlslug ? "" : params.rooturlslug;
  const extraparams = await readTokenFromFile(tokentopass);
  if (!extraparams) {
    return { props: { meta: { template: "ERROR" } } };
  }
  const doc = await getDocByFilePath(extraparams.params.originalfilepath);
  return {
    props: {
      originalfilepath: extraparams.params.originalfilepath.replace(process.cwd(), "").slice(1),
      hello: params ? JSON.stringify(params) : "world",
      templatetype: extraparams.params.templatetype,
      ...doc,
    },
  };
}

// Credit to Alex Christie at https://www.inadequatefutures.com/garden/04-dynamic-routes-nextjs
const contentSource = ["src/content/advanced", "src/content/basic"];
export async function getStaticPaths() {
  const paths = await getMdRootStaticPaths();
  await saveTokensToFile(paths);
  return {
    paths,
    fallback: false,
  };
}

/*export async function getStaticPaths() {
  // Credit to Ashutosh at https://dev.to/akuks/what-is-getstaticpaths-in-nextjs-5ee5
  return {
    paths: [
      { params: { rooturlslug: [] } },
      { params: { rooturlslug: ["1"] } },
      { params: { rooturlslug: ["2"] } },
      { params: { rooturlslug: ["3"] } },
    ],
    fallback: false,
  };
}*/
