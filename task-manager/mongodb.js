// CRUD - create read update delete

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;
const uuid = mongodb.UUID;

const id = new ObjectID();
console.log(id.str);
console.log(id.toHexString());



const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

MongoClient.connect(connectionURL, { useNewUrlParser: true}, (error, client) => {
    if(error) {
       return console.log('Unable to connect to database');
    }

    const db = client.db(databaseName);
    // db.collection('users').insertOne({
    //     name: 'Saurabh',
    //     age: 34
    // }, (error, result) => {
    //     if(error) {
    //         return console.log('Unable to insert');
    //     }        
    //     console.log(result.ops);
    // });

    // db.collection('users').insertMany([
    //     {
    //         name: 'Christian',
    //         age: 50,
    //     },
    //     {
    //         name: 'Tom',
    //         age: 51
    //     }
    // ], (error, result) => {
    //     if(error) {
    //         console.log('Unable to insert docs');    
    //     }
    //     console.log(result.ops);
    // })
});