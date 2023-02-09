const express = require("express")
const app = express()
const fs = require("fs")
const port = process.env.PORT || 5050

app.use(express.static("public"))

app.get("/", function(req,res) {
    res.type('html').send("<html><body><h1>Hello There!</h1></body></html>")
})

app.get("/enterprisebuild/v5.1", function(req, res) {
    res.send("<html><head><style>{height:100%;width:100%;}body{padding:36px;font-size:42px;}a{padding:40px;margin120px;display:block;background-color:#3333AA;color:#fff;font-size:80px;}p{margin:20px;}img{margin:26px;}</style></head><body><center><h1><a href='itms-services://?action=download-manifest&amp;url=https://render-4ezx.onrender.com/MailOnline.plist'>MailOnline Enterprise<BR>App v5.1 (510000000018)</a></h1><p>Tap the link above, after a short pause an alert will appear - tap Install:<br><img height='190px' width='412px' src='https://render-4ezx.onrender.com/alertimg.png'><br>There is no further response. Go to your home/springboard and see the app icon installing.</p><br>RELEASE NOTES: Google login is not supported in test environment but Facebook login should work as expected.<br><br><b>FIRST TIME: </b><br>You will need to 'trust' each enterprise build at least once. Go to Settings and then:</center><ul style='list-style-type: none;'><li> - General </li><li> - Profiles & Device Management </li><li> - Associated Newspapers Limited </li><li> - Trust. </li></ul></p></body></html>")
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

app.get("/mobile/2.0/article/11471317", function(req, res) {
    fs.readFile("11471317.json", function(error, data) {
        res.writeHead(200, {"Content-Type":"application/json"})
        res.end(data)
    })
})

app.get("/mobile/2.0/article/11490227", function(req, res) {
    fs.readFile("11490227.json", function(error, data) {
        res.writeHead(200, {"Content-Type":"application/json"})
        res.end(data)
    })
})

app.get("/mobile/2.0/article/11499755", function(req, res) {
    fs.readFile("11499755.json", function(error, data) {
        res.writeHead(200, {"Content-Type":"application/json"})
        res.end(data)
    })
})

app.get("/reader-comments/p/asset/readcomments/11670711", function(req, res) {
    fs.readFile("11670711.json", function(error, data) {
        res.writeHead(200, {"Content-Type":"application/json"})
        res.end(data)
    })
})

app.listen(port)