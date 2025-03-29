document.addEventListener('DOMContentLoaded', () => {
    // Get summary ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const summaryId = urlParams.get('id');
    
    if (!summaryId) {
        // Redirect to home page if no ID is provided
        window.location.href = 'index.html';
        return;
    }
    
    // Get summary content container
    const summaryContent = document.getElementById('summary-content');
    
    // Load summary from localStorage
    loadSummary(summaryId);
    
    function loadSummary(id) {
        const summaries = JSON.parse(localStorage.getItem('summaries')) || [];
        const summary = summaries.find(s => s.id === id);
        
        if (!summary) {
            summaryContent.innerHTML = `
                <h1>Summary Not Found</h1>
                <p>The summary you're looking for doesn't exist or has been removed.</p>
            `;
            return;
        }
        
        // Update page title
        document.title = `${summary.title} - Summary Hub`;
        
        // Format and display content
        displaySummary(summary);
    }
    
    function displaySummary(summary) {
        // Parse the content
        const formatted = formatContent(summary.content);
        
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
