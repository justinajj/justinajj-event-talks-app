
// build.js
const fs = require('fs');
const path = require('path');

const templatePath = path.join(__dirname, 'index.html');
const stylePath = path.join(__dirname, 'style.css');
const dataPath = path.join(__dirname, 'data.js');
const scriptPath = path.join(__dirname, 'script.js');
const outputPath = path.join(__dirname, 'dist', 'index.html');

// Read all necessary files
const htmlTemplate = fs.readFileSync(templatePath, 'utf8');
const cssContent = fs.readFileSync(stylePath, 'utf8');
const dataContent = fs.readFileSync(dataPath, 'utf8');
const scriptContent = fs.readFileSync(scriptPath, 'utf8');

// Combine data and script content
const combinedScript = `
${dataContent}

(function() {
${scriptContent}
})();
`;

// Inject CSS and JavaScript into the HTML template
const finalHtml = htmlTemplate
    .replace('<style id="injected-css"></style>', `<style>${cssContent}</style>`)
    .replace('<script id="injected-data"></script>', '') // Remove placeholder for data
    .replace('<script id="injected-script"></script>', `<script>${combinedScript}</script>`);


// Write the final HTML file
fs.writeFileSync(outputPath, finalHtml, 'utf8');

console.log('Website compiled successfully to dist/index.html');
