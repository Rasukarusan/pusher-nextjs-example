import type { NextApiRequest, NextApiResponse } from "next";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("きた");
  console.log(req);
  return res.status(403).json({ result: false });
}
