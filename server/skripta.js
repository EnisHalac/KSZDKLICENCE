const fs = require('fs');
const path = require('path');
const axios = require('axios');
const xlsx = require('xlsx');

// Function to download an image
const downloadImage = async (url, playerName) => {
    try {
        const response = await axios({
            method: 'GET',
            url: url,
            responseType: 'arraybuffer' // Change responseType to arraybuffer
        });

        const filePath = path.resolve(__dirname, 'public', 'images', 'players', `${playerName}.jpg`);

        // Ensure the directory exists
        fs.mkdirSync(path.dirname(filePath), { recursive: true });

        // Write the image data to the file
        fs.writeFileSync(filePath, response.data); // Use writeFileSync to save the buffer directly

        console.log(`Downloaded ${playerName}.jpg`);
    } catch (error) {
        console.error(`Failed to download ${playerName}: ${error.message}`);
    }
};

// Main function to read the Excel file and download images
const downloadImagesFromExcel = async (filePath) => {
    try {
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Extract only the columns you need
        const players = xlsx.utils.sheet_to_json(sheet, { 
            range: 1,  // Start from the second row (0-indexed)
            header: ['time','name', 'birthYear', 'birthPlace', 'imageUrl', 'club']  // Specify the headers
        });

        for (const player of players) {
            // Check if player.name is a string and has a valid value
            if (typeof player.name === 'string' && player.name.trim()) {
                const playerName = player.name.replace(/ /g, '_'); // Replace spaces with underscores
                const imageUrl = player.imageUrl;

                // Ensure the imageUrl is present
                if (imageUrl) {
                    await downloadImage(imageUrl, playerName);
                } else {
                    console.warn(`No image URL found for ${player.name}`);
                }
            } else {
                console.warn(`Invalid player name or type for entry: ${JSON.stringify(player)}`);
            }
        }
    } catch (error) {
        console.error(`Error reading Excel file: ${error.message}`);
    }
};

// Execute the function
const excelFilePath = path.resolve(__dirname, 'licence.xlsx'); // Path to your Excel file
downloadImagesFromExcel(excelFilePath);
