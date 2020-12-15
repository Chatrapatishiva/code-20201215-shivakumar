import express from "express";
import request from "request";
import {StringStream}  from "scramjet"

const app = express()
const results: any = []
let fileSize : string | undefined = "";
const port = 3000

app.get('/', (req, res) => {
    request.get("https://raw.githubusercontent.com/vamstar/challenge/master/Dataset3.csv",(err, response, body)=> {
     fileSize = response.headers['content-length'];
    })   // fetch csv
    .pipe(new StringStream())
    .CSVParse()
    .consume((object:any)=>
    results.push(object))
    .then(() => res.send({"Coloumns": results[0], "File Size": fileSize+" Bytes", "Number of lines": results.length -1}))
})


app.listen(port, () => {
  // console.log(`App listening at http://localhost:${port}`)
})