/**
 * https://vercel.com/guides/deploying-next-and-mysql-with-vercel
 * https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html
 */

import {NextApiRequest, NextApiResponse} from 'next'
import serverlessDb from "../../../lib/serverlessDb"
import escape from 'sql-template-strings'

type PropertyData = {
  properties: any,
  pageCount: number,
  page: number
}

export default async (req: NextApiRequest, res: NextApiResponse<PropertyData>) => {

  let page = parseInt(<string>req.query.page) || 1

  const limit = parseInt(<string>req.query.limit) || 9

  if (page < 1) page = 1

  const properties = await serverlessDb.query(escape`
      SELECT *
      FROM Properties
      ORDER BY id
      LIMIT ${(page - 1) * limit}, ${limit}
    `)

  const count = await serverlessDb.query(escape`
      SELECT COUNT(*)
      AS propertiesCount
      FROM Properties
    `)

  const propertiesCount = count[0]

  const pageCount = Math.ceil(propertiesCount / limit)

  res.status(200).json({properties, pageCount, page})
}
