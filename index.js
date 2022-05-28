const Application = require("./app/server");
const DB_URL = "mongodb://localhost:27017/ProjectManagerDb";

new Application(8000, DB_URL)