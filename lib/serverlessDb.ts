/**
 * https://vercel.com/guides/deploying-next-and-mysql-with-vercel
 */

import mysql from 'serverless-mysql'

const serverlessDb = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD
  }
})

exports.query = async query => {
  try {
    const results = await serverlessDb.query(query)
    await serverlessDb.end()
    return results
  } catch (error) {
    return {error}
  }
}

export default serverlessDb