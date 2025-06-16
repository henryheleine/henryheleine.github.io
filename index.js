import OpenAI from "openai"
import express from "express"
import bodyParser from "body-parser"
import fs from "fs"
import helmet from "helmet"
import http from "http"
import sanitizeHtml from "sanitize-html"
import rateLimit from "express-rate-limit"

const app = express()
const port = process.env.PORT || 5050
const openai = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'] || ""
});
const prompt = process.env['PROMPT'] || ""

app.use(express.static("public"))
app.use(bodyParser.json({limit: '50mb', extended: true})) // set request size limit
app.use(helmet()) // set sensible default headers
app.use(rateLimit({ windowMs: 2 * 60 * 1000, max: 100 })) // rate limit requests

app.get("/", function(req,res) {
    res.type('html').send("<html><body><h1>Hey there</h1></body></html>")
})

app.get("/health", function(req,res) {
    res.status(200).json({ status: "ok" })
})

app.get("/privacy", function(req,res) {
    res.type('html').send("<html><body><h1>Privacy Policy</h1><p>Information for Henry Heleine Privacy 2025 to follow soon. Contact me by emailing henryheleine86@gmail.com for further information.</p></body></html>")
})

app.get("/support", function(req,res) {
    res.type('html').send("<html><body><h1>Support</h1><p>Information for Henry Heleine support to follow soon. Contact me by emailing henryheleine86@gmail.com for further information.</p></body></html>")
})

app.get("/ua", function(req,res) {
    const userAgent = req.headers['user-agent']
    console.log("user agent = " + userAgent)
    res.status(200).json({ "userAgent": userAgent })
})

app.get("/.well-known/apple-app-site-association", function(req, res) {
    appData(res)
})

app.post("/data", (req, res) => {
    if (!req.body.imageData || !req.body.country) {
        return res.status(400).json({ error: "Invalid input data" })
    }

    const base64ImageData = sanitizeHtml(req.body.imageData)
    const country = sanitizeHtml(req.body.country)
    processImage(base64ImageData, country)
        .then(response => {
            console.log(response)
            res.status(200).json({ "content": response })
        })
        .catch(error => {
            res.status(500).json({ error: "Failed to process image" })
        })
})

app.post("/stream", (req, res) => {
    const base64ImageData = req.body.imageData
    processStream(base64ImageData, res)
})

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ error: "Endpoint not found" })
});

async function processImage(base64ImageData, country) {
    const input = "data:image/jpeg;base64," + base64ImageData
    
    // add optional country if available for improved input
    const improvedInput = (country == "unknown" ? "" : ("Given my location is " + country + ". ")) + prompt

    console.log("improvedInput = " + improvedInput)
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{
                role: "user",
                content: [{
                    type: "text", text: improvedInput
                }, {
                    type: "image_url",
                    image_url: {
                        url: input
                    }
                }]
            }],
            max_tokens: 256
        })
        return completion.choices[0].message.content
    } catch (error) {
        console.error("Error processing image:", error)
        throw error
    }
}

async function processStream(base64ImageData, res) {
    const input = "data:image/jpeg;base64," + base64ImageData
    try {
        const stream = await openai.responses.create({
            model: "gpt-4o-mini",
            input: [{
                role: "user",
                content: prompt
            },
            {
                role: "user",
                content: [{
                    type: "input_image",
                    image_url: input
                }]
            }],
            stream: true
        })
        res.status(200).type("text").set("Transfer-Encoding", "chunked")
        for await (const event of stream) {
            if (event.type === "response.output_text.delta") {
                res.write(event.delta)
            }
            if (event.type === "response.output_text.done") { // response.content_part.done, esponse.output_item.done, response.completed
                console.log("finished streaming request")
                res.end()
            }
        }
    } catch (error) {
        console.error("Error streaming image:", error)
        throw error
    }
}

async function appData(res) {
    try {
        const data = await fs.promises.readFile("apple-app-site-association.json", "utf8")
        res.status(200).type("html").send(data)
    } catch (error) {
        console.error("Error returning /.well-known/apple-app-site-association file:", error)
        res.status(500).type("text").send("no file found")
    }
}

app.listen(port)