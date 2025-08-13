import OpenAI from "openai"
import express from "express"
import bodyParser from "body-parser"
import fs from "fs"
import helmet from "helmet"
import rateLimit from "express-rate-limit"

const app = express()
const maxTokens = 256
const model = "" // getEnv("MODEL")
const openAIAPIKey = "" // getEnv("OPENAI_API_KEY")
const prompt = "" // getEnv("PROMPT")
const port = process.env.PORT || 5050
const openai = new OpenAI({
  apiKey: openAIAPIKey
})

app.use(express.static("public", { maxAge: "1d" }))
app.use(bodyParser.json({limit: '50mb', extended: true})) // set request size limit
app.use(helmet({
    contentSecurityPolicy: false,
    referrerPolicy: {
        policy: "strict-origin-when-cross-origin"
    }
}))
// app.use(rateLimit({ windowMs: 2 * 60 * 1000, max: 10 })) // rate limit requests

app.get("/", function(req,res) {
    res.type('html').send("<html><body><h1>Hey there</h1></body></html>")
})

app.post("/upload", function(req,res) {
    res.writeHead(200, { "Content-Type": "application/json", "Transfer-Encoding": "chunked"})
    for (var i = 0; i <= 1.0; i += 0.01) {
        res.write("{ \"progress\": " + i.toFixed(2) + " }")
    }
    res.end("{ \"progress\": 1.0 }")
})

app.get("/health", function(req,res) {
    res.status(200).json({
        status: "success"
    })
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
        return res.status(400).json({ error: "Invalid input data. Ensure 'imageData' and 'country' parameters are defined." })
    }

    if (!isValidBase64(req.body.imageData) || !isValidBase64(req.body.country)) {
        return res.status(400).json({ error: "Invalid input data. Ensure 'imageData' and 'country' parameters are valid base 64." })
    }

    const base64ImageData = req.body.imageData
    const country = req.body.country
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
    var improvedInput
    // add optional country if available for improved input
    if (country == "unknown") {
        improvedInput = prompt
    } else {
        improvedInput = "".concat("Given my location is ").concat(country).concat(". ").concat(prompt)
    }
    console.log("improvedInput = " + improvedInput)
    try {
        const completion = await openai.chat.completions.create({
            model: model,
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
            max_tokens: maxTokens
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
            model: model,
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
        res.status(500).send("Streaming failed")
    }
}

async function appData(res) {
    try {
        const data = await fs.promises.readFile("apple-app-site-association.json", "utf8")
        res.status(200).json(data)
    } catch (error) {
        console.error("Error returning /.well-known/apple-app-site-association file:", error)
        res.status(500).json({ status: "no file found" })
    }
}

function getEnv(varName) {
    const value = process.env[varName]
    if (!value) {
        throw new Error("Required environment variable is not set.")
    }
    return value
}

function isValidBase64(str) {
    if (typeof str !== 'string') {
        return false
    }
    if (str.length % 4 !== 0) {
        return false
    }
    const base64Regex = /^[A-Za-z0-9+/]+={0,2}$/
    return base64Regex.test(str)
}

app.listen(port)