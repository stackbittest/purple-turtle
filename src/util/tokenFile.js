import path from "path";
import { promises as fs } from "fs";

const TokensFilePath = path.join(process.cwd(), "tempdir/tokens.json");

export async function readTokenFromFile(tokenId) {
  let tokensFile = await fs.readFile(TokensFilePath);
  let tokenObj = JSON.parse(tokensFile.toString());
  return tokenObj[tokenId];
}

export async function saveTokensToFile(tokens) {
  try {
    await fs.truncate(TokensFilePath);
  } catch {}
  let tokenObj = {};
  for (let token of tokens) {
    if (!token || !token.params) {
      return;
    }
    let tokenidtowrite = !!token.params.rooturlslug
      ? token.params.rooturlslug
      : "";
    tokenObj[tokenidtowrite] = token;
  }
  return fs.writeFile(TokensFilePath, JSON.stringify(tokenObj));
}
