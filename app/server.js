const { Routes } = require('./routers/router');

module.exports = class Application {
    #express = require('express');
    #app = this.#express();
    constructor(PORT, DB_URL){
        this.configDatabse(DB_URL)
        this.configApplication()
        this.createRoutes()
        this.createServer(PORT)
        this.errorHandler()
    }
    configApplication(){
        const path = require('path');
        this.#app.use(this.#express.json());
        this.#app.use(this.#express.urlencoded({extended: true}));
        this.#app.use(this.#express.static(path.join(__dirname, "..", "public")))
    }
    createRoutes(){
        this.#app.get('/', (req, res, next) => {
            return res.json({
                message: "Express OOP App"
            })
        })
        this.#app.use(Routes)
    }
    createServer(port){
        const http = require('http');
        const server = http.createServer(this.#app);
        server.listen(port, () => {
            console.log(`Server Running at >> ${port}`);
        })
    }
    configDatabse(databse_url){
        const mongoose = require('mongoose');
        mongoose.connect(databse_url, (err) => {
            if(err) throw err
            return console.log("Connected to databse...")
        })
    }
    errorHandler(){
        this.#app.use((req, res, next) =>{
            return res.status(404).json({
                status: 404, success: false, message: "Route Not Found"
            })
        })
        this.#app.use((error, req, res, next) =>{
            const status = error?.status || 500;
            const message = error?.message || "InternalServerError";
            return res.status(status).json({
                status,
                success: false, 
                message
            })
        })
    }
}