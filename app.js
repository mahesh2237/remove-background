// Importing necessary modules
const { removeBackground } = require("@imgly/background-removal-node");
var path = require("path");

const port = 3031;

const fs = require("fs");

const express = require("express");

const app = express();

app.get("/", function (req, res) {
  res.send("Background Remover Service Running");
});

app.get("/remove-background/:path", async function (req, res) {
  try {
    const filePath = req.params.path;
    const resultDataURL = await removeImageBackground(filePath);

    console.log(path.basename(filePath));

    const filename = path.parse(filePath).name;

   
    parentDirectoryPath = path.dirname(filePath);

    const newFilePath = parentDirectoryPath+"/"+filename + "-remove-bg.png";

    // Writing the result to a file (optional)
    fs.writeFileSync(
        newFilePath,
      resultDataURL.split(";base64,").pop(),
      { encoding: "base64" }
    );

    // Logging success message
    console.log("Background removed successfully.");
  } catch (error) {
    // Logging error message
    console.error("Error:", error.message);
  }
  res.send("Background Remover Service Running");
});

app.post("/", function (req, res) {
  res.send("Background Remover Service Running");
});

// Listening to server at port 3000
app.listen(port, function () {
  console.log("server started");
});

// Function to remove background from an image
async function removeImageBackground(imgSource) {
  try {
    // Removing background
    const blob = await removeBackground(imgSource);

   
    // Converting Blob to buffer
    const buffer = Buffer.from(await blob.arrayBuffer());

    // Generating data URL
    const dataURL = `data:image/png;base64,${buffer.toString("base64")}`;

    // Returning the data URL
    return dataURL;
  } catch (error) {
    // Handling errors
    throw new Error("Error removing background: " + error);
  }
}

// Example usage
async function main() {
  try {
    // Path to the input image
    const imgSource = "photo.jpg";

    // Removing background from the input image
    const resultDataURL = await removeImageBackground(imgSource);

    // Writing the result to a file (optional)
    fs.writeFileSync(
      "output-photo.png",
      resultDataURL.split(";base64,").pop(),
      { encoding: "base64" }
    );

    // Logging success message
    console.log("Background removed successfully.");
  } catch (error) {
    // Logging error message
    console.error("Error:", error.message);
  }
}

// Calling the main function
//main();
