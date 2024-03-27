const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017'; // URL di connessione al database MongoDB

const client = new MongoClient(uri, { useUnifiedTopology: true });

async function connectDB() {
    try {
        await client.connect();
        console.log('Connesso al database!');
        return client.db('guadagni-perdite').collection('transazioni');
    } catch (error) {
        console.error('Errore di connessione al database:', error);
    }
}

module.exports = connectDB;