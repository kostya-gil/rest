module.exports = {
    "type": "postgres",
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "synchronize": true,
    "logging": false,
    "cache": false,
    "entities": [
     "dist/entity/*.js"
     ],
     "migrations": [
         "dist/migration/.*js"
     ],
     "subscribers": [
        "dist/subscriber/.*js"
     ],
     "cli": {
         "entitiesDir": "src/entity",
         "migrationsDir": "src/migration",
         "subscribersDir": "src/subscriber"
     }
  }
  