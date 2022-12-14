const express = require("express")
const app = express()
const fs = require("fs")
const port = process.env.PORT || 5050

app.use(express.static("public"))

app.get("/", function(req,res) {
    res.type('html').send("<html><body><h1>Hello There!</h1></body></html>")
})

app.get("/enterprisebuild/v4.7", function(req, res) {
    fs.readFile("public/enterprise.html", function(error, data) {
        res.writeHead(200, {"Content-Type":"text/html"})
        res.end(data)
    })
})

app.get("/health", function(req,res) {
    res.writeHead(200, {"Content-Type":"text/html"})
    res.end()
})

app.get("/mobile/2.0/channel/ushome", function(req, res) {
    fs.readFile("ushome.json", function(error, data) {
        res.writeHead(200, {"Content-Type":"application/json"})
        res.end(data)
    })
})

app.listen(port)