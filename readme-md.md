# Summary Hub

A simple, browser-based application for uploading, storing, and reading text summaries. This application runs entirely in the browser without requiring a server backend, making it perfect for hosting on GitHub Pages.

## Features

- Upload and store text files (.txt)
- Automatically extract titles and descriptions
- Responsive design that works on desktop and mobile
- Format text with proper headings and bullet points
- Storage using browser's localStorage
- No server required - can be hosted on GitHub Pages

## Project Structure

```
summary-hub/
├── index.html          # Main page with upload form and summary cards
├── summary.html        # Individual summary view page
├── css/
│   └── style.css       # Stylesheet for the entire application
├── js/
│   ├── app.js          # Main JavaScript logic
│   └── summary.js      # Logic for summary display page
└── README.md           # This documentation
```

## How It Works

This application uses the browser's localStorage to store and retrieve your summaries. When you upload a text file:

1. The file is read and processed in the browser
2. The title is extracted from the first line
3. A short description is created from the first few sentences
4. The content is stored in localStorage
5. A card with the title and description is displayed on the main page

When you click on a summary card:

1. You're taken to the summary.html page
2. The application retrieves the full content from localStorage
3. The content is formatted with proper headings, paragraphs, and bullet points
4. The formatted content is displayed on the page

## How to Use

1. Upload your text files using the "Choose Files" button
2. Click "Upload Summaries" to process the files
3. View your summaries on the main page
4. Click "Read More" to see the full content of any summary

## Deployment to GitHub Pages

To deploy this application to GitHub Pages:

1. Create a new repository on GitHub
2. Clone the repository to your local machine
3. Copy all the files from this project into the repository
4. Commit and push the files to GitHub
5. Go to your repository settings on GitHub
6. Scroll down to the "GitHub Pages" section
7. Select the branch you want to deploy (usually "main")
8. Click "Save"

Your site will be published at `https://[your-username].github.io/[repository-name]/`

## Limitations

- This application uses localStorage, which has a storage limit (usually 5-10MB)
- Uploaded files are not backed up to any external server
- If you clear your browser data, your summaries will be lost
- This is designed for simple text files, not complex documents

## Customization

You can customize the appearance by editing the `css/style.css` file. The application uses CSS variables for colors, which you can modify at the top of the file.

## Sample Data

The application includes code for adding sample data. To enable this feature:

1. Open `js/app.js`
2. Uncomment the line `// addSampleData();` at the bottom of the file
3. Save the file

This will add three sample summaries to demonstrate how the application works.

## Browser Compatibility

This application works in all modern browsers that support:
- ES6 JavaScript
- localStorage
- FileReader API

## License

This project is free to use for any purpose.
