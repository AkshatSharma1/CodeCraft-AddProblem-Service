const { CosmosClient } = require('@azure/cosmos')

//connecting port to cosmos db (req: endpoint, )
const endpoint = process.env.COSMOS_DB_ENDPOINT
const key = process.env.COSMOS_DB_KEY
const databaseId = "log-store" //database name
const containerId = "error-logs" //table name

const client = new CosmosClient({endpoint, key})
const db = client.database(databaseId);
const container = db.container(containerId) // its the table
// const { database } = await client.databases.createIfNotExists({id: databaseId})
// const { container } = await database.containers.createIfNotExists({id: containerId})

async function logToCosmosDB(level, message){
    try {
        //create an item with given structure
        await container.items.create({
            timeStamp: new Date().toISOString(),
            level: level,
            message: message
        })

        console.log("Entry created in COSMOS DB")

    } catch (error) {
        console.log("Error logging to COSMOS DB")
    }
}


module.exports = {logToCosmosDB}


