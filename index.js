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

app.get("/mobile/2.0/channel/ushome", function(req, res) {
    if (req.query.isTopic) {
        res.redirect(301, 'https://render-4ezx.onrender.com/mobile/2.0/channel/ushome?page=1&sort=editor')
    } else {
        fs.readFile("ushome.json", function(error, data) {
            res.writeHead(200, {"Content-Type":"application/json"})
            res.end(data)
        })
    }
})

app.get("/mobile/2.0/channel/podcasts", function(req, res) {
    fs.readFile("podcasts.json", function(error, data) {
        res.writeHead(200, {"Content-Type":"application/json"})
        res.end(data)
    })
})

app.get("/mobile/2.0/channel/sport", function(req, res) {
    fs.readFile("sport.json", function(error, data) {
        res.writeHead(200, {"Content-Type":"application/json"})
        res.end(data)
    })
})

app.get("/mobile/2.0/channel/mailplus", function(req, res) {
    fs.readFile("mailplus.json", function(error, data) {
        res.writeHead(200, {"Content-Type":"application/json"})
        res.end(data)
    })
})

app.get("/mobile/2.0/channel/usshowbiz", function(req, res) {
    fs.readFile("usshowbiz.json", function(error, data) {
        res.writeHead(200, {"Content-Type":"application/json"})
        res.end(data)
    })
})

app.get("/mobile/2.0/channel/travel", function(req, res) {
    fs.readFile("travel.json", function(error, data) {
        res.writeHead(200, {"Content-Type":"application/json"})
        res.end(data)
    })
})

app.get("/mobile/2.0/channel/auhome", function(req, res) {
    fs.readFile("auhome.json", function(error, data) {
        res.writeHead(200, {"Content-Type":"application/json"})
        res.end(data)
    })
})

app.get("/mobile/2.0/channel/premierleague", function(req, res) {
    fs.readFile("auhome.json", function(error, data) {
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

app.get("/mobile/2.0/article/13611283", function(req, res) {
    fs.readFile("13611283.json", function(error, data) {
        res.writeHead(200, {"Content-Type":"application/json"})
        res.end(data)
    })
})

app.get("/mobile/2.0/article/12840959", function(req, res) {
    fs.readFile("12840959.json", function(error, data) {
        res.writeHead(200, {"Content-Type":"application/json"})
        res.end(data)
    })
})

app.get("/mobile/2.0/article/12066081", function(req, res) {
    fs.readFile("12066081.json", function(error, data) {
        res.writeHead(200, {"Content-Type":"application/json"})
        res.end(data)
    })
})

app.get("/mobile/2.0/article/13595871", function(req, res) {
    fs.readFile("13595871.json", function(error, data) {
        res.writeHead(200, {"Content-Type":"application/json"})
        res.end(data)
    })
})

app.get("/mobile/2.0/article/12065971", function(req, res) {
    fs.readFile("12065971.json", function(error, data) {
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

app.get("/mobile/2.0/article/12060079", function(req, res) {
    fs.readFile("12060079.json", function(error, data) {
        res.writeHead(200, {"Content-Type":"application/json"})
        res.end(data)
    })
})

app.get("/mobile/2.0/article/12345", function(req, res) {
    fs.readFile("12345.json", function(error, data) {
        res.writeHead(200, {"Content-Type":"application/json"})
        res.end(data)
    })
})

app.get("/mobile/2.0/article/12292325", function(req, res) {
    fs.readFile("12292325.json", function(error, data) {
        res.writeHead(200, {"Content-Type":"application/json"})
        res.end(data)
    })
})

app.get("/mobile/2.0/article/12279945", function(req, res) {
    fs.readFile("12279945.json", function(error, data) {
        res.writeHead(200, {"Content-Type":"application/json"})
        res.end(data)
    })
})

app.get("/mobile/2.0/article/6172937", function(req, res) {
    fs.readFile("6172937.json", function(error, data) {
        res.writeHead(200, {"Content-Type":"application/json"})
        res.end(data)
    })
})

app.get("/mobile/2.0/article/12338883", function(req, res) {
    fs.readFile("12338883.json", function(error, data) {
        res.writeHead(200, {"Content-Type":"application/json"})
        res.end(data)
    })
})

app.get("/mobile/2.0/article/12512879", function(req, res) {
    fs.readFile("12512879.json", function(error, data) {
        res.writeHead(200, {"Content-Type":"application/json"})
        res.end(data)
    })
})

app.get("/mobile/2.0/article/13820593", function(req, res) {
    fs.readFile("13820593.json", function(error, data) {
        res.writeHead(200, {"Content-Type":"application/json"})
        res.end(data)
    })
})

app.get("/mobile/2.0/article/243", function(req, res) {
    fs.readFile("243.json", function(error, data) {
        res.writeHead(200, {"Content-Type":"application/json"})
        res.end(data)
    })
})

app.get("/reader-comments/p/asset/readcomments/11888153", function(req, res) {
    fs.readFile("firework-comments.json", function(error, data) {
        res.writeHead(200, {"Content-Type":"application/json"})
        res.end(data)
    })
})

app.post("/cancelledTrialerReceipt", function(req, res) {
    fs.readFile("cancelledTrialerReceipt.json", function(error, data) {
        var input = ''
        req.on('data', function (chunk) {
            input += chunk
        })
        req.on('end', function () {
            req.rawBody = input
            res.end(data)
        })
    })
})

app.post("/churnedReceipt", function(req, res) {
    fs.readFile("churnedReceipt.json", function(error, data) {
        var input = ''
        req.on('data', function (chunk) {
            input += chunk
        })
        req.on('end', function () {
            req.rawBody = input
            res.end(data)
        })
    })
})

app.post("/subscriberReceipt", function(req, res) {
    fs.readFile("subscriberReceipt.json", function(error, data) {
        var input = ''
        req.on('data', function (chunk) {
            input += chunk
        })
        req.on('end', function () {
            req.rawBody = input
            res.end(data)
        })
    })
})

app.post("/trialerReceipt", function(req, res) {
    fs.readFile("trialerReceipt.json", function(error, data) {
        var input = ''
        req.on('data', function (chunk) {
            input += chunk
        })
        req.on('end', function () {
            req.rawBody = input
            res.end(data)
        })
    })
})

app.post("/winbackReceipt", function(req, res) {
    fs.readFile("winbackReceipt.json", function(error, data) {
        var input = ''
        req.on('data', function (chunk) {
            input += chunk
        })
        req.on('end', function () {
            req.rawBody = input
            res.end(data)
        })
    })
})

app.listen(port)