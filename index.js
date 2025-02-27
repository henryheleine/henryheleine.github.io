import OpenAI from "openai"
import express from "express"
import bodyParser from "body-parser"
import fs from "fs"
import http from "http"

const app = express()
const port = process.env.PORT || 5050
const openai = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY']
});


app.use(express.static("public"))
app.use(bodyParser.json({limit: '50mb', extended: true}))

app.get("/", function(req,res) {
    res.type('html').send("<html><body><h1>Hey there</h1></body></html>")
})

app.get("/health", function(req,res) {
    res.writeHead(200, {"Content-Type":"text/html"})
    res.end()
})

app.get("/ua", function(req,res) {
    const userAgent = req.headers['user-agent']
    console.log("user agent = " + userAgent)
    res.writeHead(200, {"Content-Type":"text/html"})
    res.end("{ \"userAgent\": \"" + userAgent + "\"}")
})

app.get("/.well-known/apple-app-site-association", function(req, res) {
    fs.readFile("apple-app-site-association.json", function(error, data) {
        res.writeHead(200, {"Content-Type":"text/html"})
        res.end(data)
    })
})

app.post("/data", (req, res) => {
    console.log("start id request")
    const base64ImageData = req.body.imageData
    const result = processImage(base64ImageData)
    console.log("result =")
    console.log(result)
    res.status(200).send(result)
})

function processImage(base64ImageData) {
    const input = "data:image/jpeg;base64," + base64ImageData
    console.log("input = ")
    console.log(input)
    try {
        const completion = openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{
                role: "user",
                content: [{
                    type: "text", text: "Describe this image"
                }, {
                    type: "image_url",
                    image_url: {
                        url: input
                    },
                }],
            }],
            max_tokens: 256
        })
        completion.then((result) => {
            return result.choices[0].message.content
        })
    } catch (error) {
        console.error("Error processing image:", error)
        throw error
    }
}

app.listen(port)