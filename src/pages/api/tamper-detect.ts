import request from "request";
import { NextApiRequest, NextApiResponse, PageConfig } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    req.pipe(request("http://pdf-analyser.edpsciences.org/check")).pipe(res);
  } catch (e) {
    console.log("🚀 ~ file: tamper.ts:48 ~ handler ~ e", e);
  }
}

export const config: PageConfig = {
  api: {
    bodyParser: false
  }
};
