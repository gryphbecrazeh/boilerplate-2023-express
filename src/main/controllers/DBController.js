const Client = require('pg').Client;
const Sequelize = require('sequelize');

class DBController {
    host = 'localhost';
    port = 5432;
    user = 'postgres';
    pass = 'postgres';
    database = 'gryphon_media_db';
    table = null
    connection = null

    constructor() {
        const dotenv = require('dotenv');
        dotenv.config();
        this.user = process.env.DB_USER
        this.password = process.env.DB_PASSWORD
        this.host = process.env.DB_HOST
        this.port = process.env.DB_PORT
        this.database = process.env.DB_NAME
        this.connectionString = process.env.DATABASE_URL

        this.client = new Client({
            user: this.user,
            host: this.host,
            database: this.database,
            password: this.pass,
            connectionString: this.connectionString,
            port: this.port,
        })

        this.sequelize = new Sequelize(process.env.DATABASE_URL);

        this.error = (err) => {
            console.log(err)
        }
        this.create = (query) => {

        }
        this.query = async (query) => {
            await this.client.connect()
            const result = await this.client.query(query)
            await this.client.end()
            return result
        }
        this.update = (query) => {

        }
        this.delete = (query) => {

        }

    }

}
module.exports = DBController;