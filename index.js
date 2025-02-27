import OpenAI from "openai"
import express from "express"
import bodyParser from "body-parser"
import fs from "fs"
import http from "http"

const app = express()
const port = process.env.PORT || 5050
const openai = new OpenAI({
  apiKey: "" // process.env['OPENAI_API_KEY']
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
    const base64ImageData = req.body
    const result = processImage(imageBase64)

    // res.status(200).send("Data received successfully");
    // const completion = openai.chat.completions.create({
    //     model: "gpt-4o-mini",
    //     store: true,
    //     messages: [
    //         {"role": "user", "content": "write a haiku about ai"},
    //     ],
    // })
    // completion.then((result) => res.type('html').send(result.choices[0].message))

    console.log("base64ImageData")
    console.log(req.body)
    console.log("open ai result")
    console.log(result)
    console.log("end id request")

    res.status(200).send("Done")
})

function processImage(base64Image) {
  try {
    const response = openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "Describe this image" },
            {
              type: "image_url",
              image_url: {
                url: "data:image/jpeg;base64,${base64Image}",
              },
            },
          ],
        },
      ],
      max_tokens: 300,
    })
    console.log("open ai choices")
    console.log(response.choices)
    console.log("open ai choice 0 message")
    console.log(response.choices[0].message)
    return response.choices[0].message.content
  } catch (error) {
    console.error("Error processing image:", error)
    throw error
  }
}

app.listen(port)
