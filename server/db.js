import pg from 'pg'
import dotenv from 'dotenv'
dotenv.config()
const { Pool }  = pg

export const pool =  new Pool({
  user: process.env.USER_DATABASE,
  password: process.env.PASSWORD_DATABASE,
  host: process.env.HOST_DATABASE,
  port: process.env.PORT_DATABASE,
  database: process.env.DATABASE_NAME
})

 export default { pool }