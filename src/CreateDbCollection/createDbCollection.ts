import * as mongoDb from 'mongodb';

export const createDbCollection = async (): Promise<mongoDb.Collection> => {
    const uri = "mongodb://localhost:27017/local";

    const dbClient = new mongoDb.MongoClient(uri);

    await dbClient.connect()

    const database = dbClient.db('Feed_Me');

    const collection = database.collection('Feed_Me_Collection');

    return collection;
}
