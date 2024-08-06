const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('public'));

// Endpoint to review HTML file
app.post('/review-html', (req, res) => {
    const htmlFilePath = path.join(__dirname, 'public', 'index.html');
    fs.readFile(htmlFilePath, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading file.');

        // Basic check for specific tags
        const missingTags = ['<div id="content">', '<h1>', '<p>'];
        const issues = missingTags.filter(tag => !data.includes(tag));

        if (issues.length > 0) {
            res.send(`Issues found: ${issues.join(', ')}. Please review.`);
        } else {
            res.send('HTML is correct.');
        }
    });
});

// Endpoint to review CSS file
app.post('/review-css', (req, res) => {
    const cssFilePath = path.join(__dirname, 'public', 'styles.css');
    fs.readFile(cssFilePath, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading file.');

        // Basic checks for CSS properties
        const issues = [];
        if (!data.includes('background-color: #f0f0f0')) {
            issues.push('Missing background color.');
        }
        if (!data.includes('color: #333')) {
            issues.push('Missing text color.');
        }

        if (issues.length > 0) {
            res.send(`Issues found: ${issues.join(', ')}. Please review.`);
        } else {
            res.send('CSS is correct.');
        }
    });
});

// Endpoint to review JavaScript file
app.post('/review-js', (req, res) => {
    const jsFilePath = path.join(__dirname, 'public', 'script.js');
    fs.readFile(jsFilePath, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading file.');

        // Check for existence of specific function
        const functionExists = data.includes('function exampleFunction');
        if (!functionExists) {
            res.send('exampleFunction is missing. Please define it.');
        } else {
            res.send('JavaScript is correct.');
        }
    });
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});