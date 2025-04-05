document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const summariesContainer = document.getElementById('summaries-container');
    const loadingIndicator = document.getElementById('loading');

    // Configuration - list of summaries to load
    // You'll need to update this array when you add new summary files
    const summaryFiles = [
        {
            filename: 'summaries/a11.txt',
            title: "Empire of Illusion: Frank Dikötter on Why China Isn’t a Superpower",
            description: "Frank Dikötter challenges the myth of China as a superpower, exposing its internal weaknesses and authoritarian foundations."
        },
        {
            filename: 'summaries/a10.txt',
            title: "Naval Ravikant - 44 Harsh Truths About Human Nature",
            description: "Naval Ravikant shares 44 raw truths on happiness, success, freedom, and mastering human nature."
        },
        {
            filename: 'summaries/a9.txt',
            title: "Trump Ushering a Reset",
            description: "Exploring Trump’s reshoring, tariffs, and isolationism—and their long-term impact on global economics and investment."
        },
        {
            filename: 'summaries/a8.txt',
            title: "The Troubles: War in the Streets of Northern Ireland (Ep 1)",
            description: "A powerful summary of how history, injustice, and identity ignited war in Northern Ireland’s streets."
        },
        {
            filename: 'summaries/a7.txt',
            title: "A Mind at Play: How Claude Shannon Invented the Information Age (Book Summary)",
            description: "The story of how Claude Shannon’s curiosity and intellect revolutionized how we understand information."
        },
        {
            filename: 'summaries/a1.txt',
            title: "House of Huawei - The Secret History of China's Most Controversial Company (Book Summary)",
            description: "An inside look at Huawei's rise, global ambitions, and its central role in US-China geopolitical tensions."
        },
        {
            filename: 'summaries/a2.txt',
            title: "Book Talk: How Chinese Tech Got Caught Up in an American Political Storm",
            description: "An exploration of Huawei's rise, its role in US-China tensions, and how geopolitical conflict reshapes global tech competition."
        },
        {
            filename: 'summaries/a3.txt',
            title: "House of Huawei: The Secret History of China’s Most Powerful Company",
            description: "An exploration of Huawei's rise under Ren Zhengfei, its controversial position at the heart of U.S.-China technology tensions, and its lasting geopolitical impact."
        },
        {
            filename: 'summaries/a4.txt',
            title: "The Untold Story of the Mysterious Company That Shook the World",
            description: "An examination of Huawei’s rise as China's tech giant, its controversial role in global surveillance, and the escalating geopolitical rivalry between the U.S. and China over technological dominance."
        },
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
        },
        {
            filename: 'summaries/a5.txt',
            title: "CNBC's full interview with U.S. Treasury Secretary Scott Bessent",
            description: "An in-depth conversation with U.S. Treasury Secretary Scott Bessent covering tariffs, economic strategy, geopolitical tensions, cryptocurrency policy, and efforts to rebalance global trade, especially with China."
        },
        {
            filename: 'summaries/a6.txt',
            title: "The slow death of KPMG, EY, PwC and Deloitte’s legal dream",
            description: "An analysis of the Big Four’s struggling attempt to break into the UK legal market, highlighting regulatory barriers, internal misalignments, talent retention issues, and KPMG's comparative resilience."
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
