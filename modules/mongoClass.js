const MongoClient = require('mongodb').MongoClient;
const { ObjectId } = require('mongodb');
require('dotenv').config();

const MONGODB_HOST = process.env.DB_HOST;
const MONGODB_PORT = process.env.DB_PORT;

class MongoDB {

  constructor(databaseName, collectionName) {
    this.user = process.env.DB_USER;
    this.pass = encodeURIComponent(process.env.DB_PASS);
    this.URL = `mongodb://${MONGODB_HOST}:${MONGODB_PORT}`;
    this.set(databaseName, collectionName);
  }
  set(databaseName, collectionName) {
    this.databaseName = databaseName;
    this.setCollection(collectionName);
  }
  setCollection(collectionName) {
    this.collectionName = collectionName;
  }
  insertOne(data) {
    return new Promise((resolve, reject) => {
      MongoClient.connect(this.URL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if (error != null) {

          return (false);
          this.error = 'Not connected correctly to db!';
        }
        client
          .db(this.databaseName)
          .collection(this.collectionName)
          .insertOne(data, (error, result) => {
            //console.log(result);
            if (error !== null) {
              console.log(error);
              return (false);
              this.error = 'Error insert object to collection';
            }

            resolve(result);
            client.close();
          });
      });
    });
  }
  find(data) {
    return new Promise((resolve, reject) => {
      MongoClient.connect(this.URL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if (error !== null) {
          this.error = 'Not connected correctly to db!';
          resolve(false)
        }
        client
          .db(this.databaseName)
          .collection(this.collectionName)
          .find(data)
          .toArray((error, docs) => {
            if (error !== null) {
              resolve(false)
              this.error = 'Error find any object to collection';
            }
            resolve(docs);
            client.close();
          }); // end of collection
      });
    });
  }

  delete(query) {
    return new Promise((resolve, reject) => {
      MongoClient.connect(this.URL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if (error !== null) {
          reject('Not connected correctly to server!' + error);
        }

        client
          .db(this.databaseName)
          .collection(this.collectionName)
          .deleteOne(query, (error, obj) => {
            if (error !== null) {
              reject('Error insert mant object to collection');
            }
            //console.log(`${obj.deletedCount} document(s) deleted`);
            resolve(obj);
            client.close();
          });
      });
    });
  }

  update(query, data, Objectid = true, upsert = false) {
    return new Promise((resolve, reject) => {
      MongoClient.connect(this.URL, { useUnifiedTopology: true, useNewUrlParser: true }, (error, client) => {
        if (error != null) {
          reject(false);
          this.error = 'Not connected correctly to db!';
        }
        if (Objectid) {
          query = { _id: ObjectId(query) };
        }
        if (upsert) {
          upsert = { upsert: true };
        } else {
          upsert = { upsert: false };
        }
        client
          .db(this.databaseName)
          .collection(this.collectionName)
          .updateMany(query, data, upsert, (error, result) => {
            if (error !== null) {
              reject(false);
              this.error = 'Error insert object to collection';
            }
            resolve(result.modifiedCount === 1);
            client.close();
          });
      });
    });
  }
}

module.exports = MongoDB;