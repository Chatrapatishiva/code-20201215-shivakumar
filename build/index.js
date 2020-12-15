"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const request_1 = __importDefault(require("request"));
const scramjet_1 = require("scramjet");
const app = express_1.default();
const results = [];
let fileSize = "";
const port = 3000;
app.get('/', (req, res) => {
    request_1.default.get("https://raw.githubusercontent.com/vamstar/challenge/master/Dataset3.csv", (err, response, body) => {
        fileSize = response.headers['content-length'];
    }) // fetch csv
        .pipe(new scramjet_1.StringStream()) // pass to stream
        .CSVParse() // parse into objects
        .consume((object) => results.push(object))
        .then(() => res.send({ "Coloumns": results[0], "File Size": fileSize + " Bytes", "Number of lines": results.length - 1 }));
});
app.listen(port, () => {
    // console.log(`App listening at http://localhost:${port}`)
});
