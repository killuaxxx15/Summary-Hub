# Summary Hub

A simple, static website for displaying text summaries. This application is designed to work with GitHub Pages and displays text files stored directly in your repository.

## Features

- Display text summaries (.txt files) from your repository
- Format text with proper headings and bullet points
- Responsive design that works on desktop and mobile
- No server required - can be hosted on GitHub Pages
- All visitors see the same content

## Project Structure

```
summary-hub/
├── index.html          # Main page with summary cards
├── summary.html        # Individual summary view page
├── css/
│   └── style.css       # Stylesheet for the entire application
├── js/
│   ├── app.js          # Main JavaScript logic 
│   └── summary.js      # Logic for summary display page
├── summaries/          # Directory for your text files
│   ├── asean-china-export.txt
│   ├── bill-gates-ai.txt
│   └── china-next-move.txt
└── README.md           # This documentation
```

## How It Works

This application reads text files from the `summaries/` directory in your repository:

1. The main page (index.html) shows cards for each summary
2. When you click on a card, you're taken to the summary.html page
3. The application fetches the corresponding text file
4. The content is formatted with proper headings, paragraphs, and bullet points
5. The formatted content is displayed on the page

## How to Add New Summaries

To add a new summary:

1. Create a new .txt file with your summary content
2. Upload it to the `summaries/` directory in your repository
3. Edit the `summaryFiles` array in `js/app.js` to include your new file:

```javascript
const summaryFiles = [
    // Existing files...
    {
        filename: 'summaries/your-new-file.txt',
        title: "Your Summary Title",
        description: "A brief description of your summary."
    }
];
```

## Deployment to GitHub Pages

To deploy this application to GitHub Pages:

1. Create a new repository on GitHub
2. Upload all the files, maintaining the directory structure shown above
3. Add your .txt files to the `summaries/` directory
4. Go to your repository settings on GitHub
5. Scroll down to the "GitHub Pages" section
6. Select the branch you want to deploy (usually "main")
7. Click "Save"

Your site will be published at `https://[your-username].github.io/[repository-name]/`

## Formatting Guidelines for Summary Files

For best results, format your text files as follows:

- The first line should be the title
- Use blank lines before and after section headings
- Use bullet points with `•`, `*`, or `-` at the beginning of the line

Example:
```
ASEAN Caught Between China's Export Surge and Global De-Risking

ASEAN Faces Growing Pressures Amid China's Export Surge

• ASEAN has significantly benefited from China's rapid growth.
• China's exports to ASEAN have rapidly increased.
• ASEAN exports to China have decreased by 3% since 2022.

Economic Impacts of China's Industrial Overcapacity

• ASEAN is becoming the primary offshore manufacturing base.
• Chinese overcapacity has particularly impacted various industries.
```

## Customization

You can customize the appearance by editing the `css/style.css` file. The application uses CSS variables for colors, which you can modify at the top of the file.

## Browser Compatibility

This application works in all modern browsers that support:
- ES6 JavaScript
- Fetch API

## License

This project is free to use for any purpose.
