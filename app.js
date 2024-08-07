// Importing necessary modules
const { removeBackground } = require('@imgly/background-removal-node');
const fs = require('fs');

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
        throw new Error('Error removing background: ' + error);
    }
}

// Example usage
async function main() {
    try {
        // Path to the input image
        const imgSource = 'image.jpg';

        // Removing background from the input image
        const resultDataURL = await removeImageBackground(imgSource);

        // Writing the result to a file (optional)
        fs.writeFileSync('output.png', resultDataURL.split(';base64,').pop(), { encoding: 'base64' });

        // Logging success message
        console.log('Background removed successfully.');
    } catch (error) {
        // Logging error message
        console.error('Error:', error.message);
    }
}

// Calling the main function
main();