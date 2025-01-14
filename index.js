const express = require("express")
const app = express()
const fs = require("fs")
const port = process.env.PORT || 5050


app.use(express.static("public"))

app.get("/", function(req,res) {
    res.type('html').send("<html><body><h1>Hello There!</h1></body></html>")
})

app.get("/ua", function(req,res) {
    const userAgent = req.headers['user-agent']
    console.log("user agent = " + userAgent)
    res.writeHead(200, {"Content-Type":"text/html"})
    res.end("{ \"userAgent\": \"" + userAgent + "\"}")
})

app.get("/enterprisebuild/v6.5", function(req, res) {
    res.send("<html><head><style>{height:100%;width:100%;}body{padding:36px;font-size:42px;}a{padding:40px;margin120px;display:block;background-color:#3333AA;color:#fff;font-size:80px;}p{margin:20px;}img{margin:26px;}</style></head><body><center><h1><a href='itms-services://?action=download-manifest&amp;url=https://render-4ezx.onrender.com/MailOnline.plist'>MailOnline Enterprise<BR>App v6.5 (20241007)</a></h1><p>Tap the link above, after a short pause an alert will appear - tap Install:<br><img height='190px' width='412px' src='https://render-4ezx.onrender.com/alertimg.png'><br>There is no further response. Go to your home/springboard and see the app icon installing.</p><br>RELEASE NOTES: Google login is not supported in test environment but Facebook login should work as expected.<br><br><b>FIRST TIME: </b><br>You will need to 'trust' each enterprise build at least once. Go to Settings and then:</center><ul style='list-style-type: none;'><li> - General </li><li> - Profiles & Device Management </li><li> - Associated Newspapers Limited </li><li> - Trust. </li></ul></p></body></html>")
})

app.get("/enterprisebuild/v7.0.0", function(req, res) {
    res.send("<html><head><style>{height:100%;width:100%;}body{padding:36px;font-size:42px;}a{padding:40px;margin120px;display:block;background-color:#3333AA;color:#fff;font-size:80px;}p{margin:20px;}img{margin:26px;}</style></head><body><center><h1><a href='itms-services://?action=download-manifest&amp;url=https://i.dailymail.co.uk/native/native_app_enterprise_builds/v7.0.0/MailOnline.plist'>MailOnline Enterprise<BR>App v7.0.0 (7000000)</a></h1><p>Tap the link above, after a short pause an alert will appear - tap Install:<br><img height='190px' width='412px' src='https://render-4ezx.onrender.com/alertimg.png'><br>There is no further response. Go to your home/springboard and see the app icon installing.</p><br>RELEASE NOTES: Google login is not supported in test environment but Facebook login should work as expected.<br><br><b>FIRST TIME: </b><br>You will need to 'trust' each enterprise build at least once. Go to Settings and then:</center><ul style='list-style-type: none;'><li> - General </li><li> - Profiles & Device Management </li><li> - Associated Newspapers Limited </li><li> - Trust. </li></ul></p></body></html>")
})

app.get("/enterprisebuild/v7.0.1", function(req, res) {
    res.send("<html><head><style>{height:100%;width:100%;}body{padding:36px;font-size:42px;}a{padding:40px;margin120px;display:block;background-color:#3333AA;color:#fff;font-size:80px;}p{margin:20px;}img{margin:26px;}</style></head><body><center><h1><a href='itms-services://?action=download-manifest&amp;url=https://i.dailymail.co.uk/native/native_app_enterprise_builds/v7.0.1/MailOnline.plist'>MailOnline Enterprise<BR>App v7.0.1 (7000001)</a></h1><p>Tap the link above, after a short pause an alert will appear - tap Install:<br><img height='190px' width='412px' src='https://render-4ezx.onrender.com/alertimg.png'><br>There is no further response. Go to your home/springboard and see the app icon installing.</p><br>RELEASE NOTES: Google login is not supported in test environment but Facebook login should work as expected.<br><br><b>FIRST TIME: </b><br>You will need to 'trust' each enterprise build at least once. Go to Settings and then:</center><ul style='list-style-type: none;'><li> - General </li><li> - Profiles & Device Management </li><li> - Associated Newspapers Limited </li><li> - Trust. </li></ul></p></body></html>")
})

app.get("/enterprisebuild/v7.0.2", function(req, res) {
    res.send("<html><head><style>{height:100%;width:100%;}body{padding:36px;font-size:42px;}a{padding:40px;margin120px;display:block;background-color:#3333AA;color:#fff;font-size:80px;}p{margin:20px;}img{margin:26px;}</style></head><body><center><h1><a href='itms-services://?action=download-manifest&amp;url=https://i.dailymail.co.uk/native/native_app_enterprise_builds/v7.0.2/MailOnline.plist'>MailOnline Enterprise<BR>App v7.0.2 (7000002)</a></h1><p>Tap the link above, after a short pause an alert will appear - tap Install:<br><img height='190px' width='412px' src='https://render-4ezx.onrender.com/alertimg.png'><br>There is no further response. Go to your home/springboard and see the app icon installing.</p><br>RELEASE NOTES: Google login is not supported in test environment but Facebook login should work as expected.<br><br><b>FIRST TIME: </b><br>You will need to 'trust' each enterprise build at least once. Go to Settings and then:</center><ul style='list-style-type: none;'><li> - General </li><li> - Profiles & Device Management </li><li> - Associated Newspapers Limited </li><li> - Trust. </li></ul></p></body></html>")
})

app.get("/.well-known/apple-app-site-association", function(req, res) {
    fs.readFile("apple-app-site-association.json", function(error, data) {
        res.writeHead(200, {"Content-Type":"text/html"})
        res.end(data)
    })
})

app.get("/registration/activate.html", function(req,res) {
    res.send("<html><head><title>test</title></head><body><a href='https://render-4ezx.onrender.com/registration/activate.html?email=diego.manilla%40mailonline.co.uk&vc=e86b6b67-32e5-4170-bc9d-1b40445bd821'>LINK</a></body></html>")
})

app.get("/health", function(req,res) {
    res.writeHead(200, {"Content-Type":"text/html"})
    res.end()
})

app.get("/reader-comments/p/asset/readcomments/11888153", function(req, res) {
    fs.readFile("comments.json", function(error, data) {
        res.writeHead(200, {"Content-Type":"application/json"})
        res.end(data)
    })
})

app.listen(port)