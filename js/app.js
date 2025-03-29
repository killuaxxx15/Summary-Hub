document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const summariesContainer = document.getElementById('summaries-container');
    const loadingIndicator = document.getElementById('loading');

    // Configuration - list of summaries to load
    // You'll need to update this array when you add new summary files
    const summaryFiles = [
        {
            filename: 'summaries/asean-china-export.txt',
            title: "ASEAN Caught Between China's Export Surge and Global De-Risking",
            description: "ASEAN faces mounting pressures due to Chinese industrial overcapacity and export surge."
        },
        {
            filename: 'summaries/bill-gates-ai.txt',
            title: "Bill Gates on AI and Innovation",
            description: "Bill Gates discusses the transformative potential and challenges of artificial intelligence."
        },
        {
            filename: 'summaries/china-next-move.txt',
            title: "China's next move | GZERO World with Ian Bremmer",
            description: "Analysis of Xi Jinping's leadership and China's economic and technological ambitions."
        }
        // Add more summary files here as you upload them to your repository
    ];

    // Load summaries
    loadSummaries();

    // Functions
    async function loadSummaries() {
        try {
            // Clear container except loading indicator
            while (summariesContainer.children.length > 1) {
                summariesContainer.removeChild(summariesContainer.lastChild);
            }

            // Add summary cards for each file
            for (const summary of summaryFiles) {
                addSummaryCard(summary);
            }

            // Hide loading indicator
            loadingIndicator.style.display = 'none';
        } catch (error) {
            console.error('Error loading summaries:', error);
            summariesContainer.innerHTML = `
                <div class="error-state">
                    <p>Error loading summaries. Please try again later.</p>
                </div>
            `;
        }
    }

    function addSummaryCard(summary) {
        const card = document.createElement('div');
        card.className = 'summary-card';
        
        card.innerHTML = `
            <div class="summary-card-content">
                <h3>${summary.title}</h3>
                <p>${summary.description}</p>
            </div>
            <div class="summary-card-footer">
                <a href="summary.html?file=${encodeURIComponent(summary.filename)}" class="read-more">Read More &rarr;</a>
            </div>
        `;

        summariesContainer.appendChild(card);
    }
});
