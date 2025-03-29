// Add this code to app.js to enable export/import functionality

// Add these elements to index.html in the upload-section:
// <div class="extra-actions">
//     <button id="export-btn" class="secondary-btn">Export All Summaries</button>
//     <label for="import-input" class="secondary-btn">Import Summaries</label>
//     <input type="file" id="import-input" accept=".json" style="display: none;">
// </div>

// Add these functions to app.js:

// Export all summaries as JSON file
function exportSummaries() {
    const summaries = JSON.parse(localStorage.getItem('summaries')) || [];
    
    if (summaries.length === 0) {
        showToast('No summaries to export', 'error');
        return;
    }
    
    // Create JSON blob
    const data = JSON.stringify(summaries, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    
    // Create download link
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `summary-hub-export-${new Date().toISOString().slice(0, 10)}.json`;
    
    // Trigger download
    document.body.appendChild(a);
    a.click();
    
    // Cleanup
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showToast('Summaries exported successfully', 'success');
}

// Import summaries from JSON file
function importSummaries(event) {
    const file = event.target.files[0];
    
    if (!file) {
        return;
    }
    
    const reader = new FileReader();
    
    reader.onload = (e) => {
        try {
            const importedData = JSON.parse(e.target.result);
            
            if (!Array.isArray(importedData)) {
                throw new Error('Invalid format');
            }
            
            // Validate each summary
            importedData.forEach(summary => {
                if (!summary.id || !summary.title || !summary.content) {
                    throw new Error('Invalid summary format');
                }
            });
            
            // Get existing summaries
            const existingSummaries = JSON.parse(localStorage.getItem('summaries')) || [];
            
            // Merge summaries (avoiding duplicates by ID)
            const existingIds = new Set(existingSummaries.map(s => s.id));
            const newSummaries = importedData.filter(s => !existingIds.has(s.id));
            
            if (newSummaries.length === 0) {
                showToast('No new summaries to import', 'error');
                return;
            }
            
            // Update localStorage
            localStorage.setItem('summaries', JSON.stringify([...existingSummaries, ...newSummaries]));
            
            // Reload summaries
            loadSummaries();
            
            showToast(`Imported ${newSummaries.length} new summaries`, 'success');
        } catch (error) {
            showToast('Error importing summaries: Invalid format', 'error');
            console.error('Import error:', error);
        }
    };
    
    reader.readAsText(file);
    
    // Clear file input
    event.target.value = '';
}

// Add event listeners
document.getElementById('export-btn').addEventListener('click', exportSummaries);
document.getElementById('import-input').addEventListener('change', importSummaries);

// Add this CSS to style.css:
/*
.extra-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid var(--border-color);
}

.secondary-btn {
    padding: 0.5rem 1rem;
    background-color: #f0f0f0;
    color: var(--text-color);
    border: 1px solid var(--border-color);
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.secondary-btn:hover {
    background-color: #e0e0e0;
}
*/
