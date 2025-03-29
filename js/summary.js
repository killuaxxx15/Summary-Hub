document.addEventListener('DOMContentLoaded', () => {
    // Get file path from URL
    const urlParams = new URLSearchParams(window.location.search);
    const filePath = urlParams.get('file');
    
    if (!filePath) {
        // Redirect to home page if no file is provided
        window.location.href = 'index.html';
        return;
    }
    
    // Get summary content container
    const summaryContent = document.getElementById('summary-content');
    
    // Load summary from file
    loadSummary(filePath);
    
    async function loadSummary(filePath) {
        try {
            const response = await fetch(filePath);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const content = await response.text();
            
            // Extract title from first line
            const title = content.split('\n')[0].trim();
            
            // Update page title
            document.title = `${title} - Summary Hub`;
            
            // Format and display content
            displaySummary(content);
        } catch (error) {
            console.error('Error loading summary:', error);
            summaryContent.innerHTML = `
                <h1>Error Loading Summary</h1>
                <p>The summary file could not be loaded. It may have been moved or deleted.</p>
                <p>Error: ${error.message}</p>
            `;
        }
    }
    
    function displaySummary(content) {
        // Parse the content
        const formatted = formatContent(content);
        
        // Update the DOM
        summaryContent.innerHTML = formatted;
    }
    
    function formatContent(content) {
        // Split content into lines
        const lines = content.split('\n');
        
        // Process content to HTML format
        let html = '';
        let inList = false;
        
        lines.forEach((line, index) => {
            const trimmedLine = line.trim();
            
            // Skip empty lines
            if (trimmedLine === '') {
                if (inList) {
                    html += '</ul>';
                    inList = false;
                }
                return;
            }
            
            // First line is the title
            if (index === 0) {
                html += `<h1>${trimmedLine}</h1>`;
                return;
            }
            
            // Second-level headings (surrounded by empty lines)
            if (index > 0 && 
                (index === lines.length - 1 || lines[index + 1]?.trim() === '') && 
                (lines[index - 1]?.trim() === '')) {
                html += `<h2>${trimmedLine}</h2>`;
                return;
            }
            
            // Bullet points
            if (trimmedLine.startsWith('•') || trimmedLine.startsWith('*') || trimmedLine.startsWith('-')) {
                if (!inList) {
                    html += '<ul class="bullet-list">';
                    inList = true;
                }
                
                const listItem = trimmedLine.substring(1).trim();
                html += `<li>${listItem}</li>`;
                return;
            }
            
            // Close list if not a bullet point anymore
            if (inList && !trimmedLine.startsWith('•') && !trimmedLine.startsWith('*') && !trimmedLine.startsWith('-')) {
                html += '</ul>';
                inList = false;
            }
            
            // Regular paragraph
            html += `<p>${trimmedLine}</p>`;
        });
        
        // Close any open list
        if (inList) {
            html += '</ul>';
        }
        
        return html;
    }
});
