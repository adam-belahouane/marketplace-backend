import fs from "fs-extra"
import path from "path"
import pool from "./connect.js"

const tablesFilePath = path.join(process.cwd(), "src/db/tables.sql")

const createTables = async () => {
    try {
        const buffer = await fs.readFile(tablesFilePath)
        const tablesSQLQuery = buffer.toString()
        await pool.query(tablesSQLQuery)
        console.log("tables created")
    } catch (error) {
        console.log(error)
    }
}

export default createTables