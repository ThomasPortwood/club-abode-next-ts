/**
 * https://nextjs.org/docs/api-routes/dynamic-api-routes
 * https://nextjs.org/docs/basic-features/typescript#api-routes
 */

import {NextApiRequest, NextApiResponse} from 'next'

type Data = {
  result: string
}

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {

  res.status(200).json({result: "success"});
}
