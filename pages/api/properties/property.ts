/**
 * https://vercel.com/guides/deploying-next-and-mysql-with-vercel
 */

import serverlessDb from '../../../lib/serverlessDb'
import escape from 'sql-template-strings'
import {NextApiRequest, NextApiResponse} from "next";

interface PropertyData {
  property: object
}

export default async (req: NextApiRequest, res: NextApiResponse<PropertyData>) => {

  const [property] = await serverlessDb.query<any>(escape`
    SELECT *
    FROM Properties
    WHERE id = ${req.query.id}
  `)

  res.status(200).json({property})
}
