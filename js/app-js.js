document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const fileInput = document.getElementById('file-input');
    const uploadBtn = document.getElementById('upload-btn');
    const summariesContainer = document.getElementById('summaries-container');

    // Initialize localStorage if needed
    if (!localStorage.getItem('summaries')) {
        localStorage.setItem('summaries', JSON.stringify([]));
    }

    // Load existing summaries
    loadSummaries();

    // Event Listeners
    uploadBtn.addEventListener('click', handleFileUpload);

    // Functions
    function handleFileUpload() {
        const files = fileInput.files;
        
        if (files.length === 0) {
            showToast('Please select at least one file', 'error');
            return;
        }

        Array.from(files).forEach(file => {
            if (file.type !== 'text/plain') {
                showToast(`${file.name} is not a text file`, 'error');
                return;
            }

            const reader = new FileReader();
            
            reader.onload = (e) => {
                const content = e.target.result;
                const filename = file.name;
                const title = extractTitle(filename, content);
                const description = extractDescription(content);
                const timestamp = new Date().toISOString();
                const id = generateId();

                // Save summary to localStorage
                saveSummary({
                    id,
                    title,
                    description,
                    content,
                    filename,
                    timestamp
                });

                // Create and add summary card
                addSummaryCard({
                    id,
                    title,
                    description,
                    timestamp
                });

                showToast(`${filename} uploaded successfully!`, 'success');
            };

            reader.readAsText(file);
        });

        // Clear file input
        fileInput.value = '';
    }

    function loadSummaries() {
        const summaries = JSON.parse(localStorage.getItem('summaries')) || [];
        
        if (summaries.length === 0) {
            // Display some sample cards if no summaries exist
            summariesContainer.innerHTML = `
                <div class="empty-state">
                    <p>No summaries yet. Upload some text files to get started!</p>
                </div>
            `;
            return;
        }

        // Sort summaries by timestamp (newest first)
        summaries.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        // Clear container
        summariesContainer.innerHTML = '';

        // Add summary cards
        summaries.forEach(summary => {
            addSummaryCard(summary);
        });
    }

    function addSummaryCard(summary) {
        const card = document.createElement('div');
        card.className = 'summary-card';
        
        const date = new Date(summary.timestamp).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });

        card.innerHTML = `
            <div class="summary-card-content">
                <h3>${summary.title}</h3>
                <p>${summary.description}</p>
            </div>
            <div class="summary-card-footer">
                <small>${date}</small>
                <a href="summary.html?id=${summary.id}" class="read-more">Read More &rarr;</a>
            </div>
        `;

        summariesContainer.appendChild(card);
    }

    function saveSummary(summary) {
        const summaries = JSON.parse(localStorage.getItem('summaries')) || [];
        summaries.push(summary);
        localStorage.setItem('summaries', JSON.stringify(summaries));
    }

    function extractTitle(filename, content) {
        // Try to extract title from first line of content
        const firstLine = content.split('\n')[0].trim();
        
        if (firstLine && firstLine.length < 100) {
            return firstLine;
        }
        
        // Fall back to filename without extension
        return filename.replace(/\.[^/.]+$/, "");
    }

    function extractDescription(content) {
        // Extract first few sentences as description
        const sentences = content.split(/[.!?]/).filter(s => s.trim().length > 0);
        const description = sentences.slice(0, 2).join('. ');
        
        return description.length > 150 ? description.substring(0, 147) + '...' : description;
    }

    function generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substring(2);
    }

    function showToast(message, type = 'success') {
        // Remove any existing toast
        const existingToast = document.querySelector('.toast');
        if (existingToast) {
            existingToast.remove();
        }

        // Create new toast
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);

        // Show toast
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);

        // Auto hide after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    }

    // Add sample data if in development/demo mode
    function addSampleData() {
        const samples = [
            {
                title: "ASEAN Caught Between China's Export Surge and Global De-Risking",
                content: `ASEAN Caught Between China's Export Surge and Global De-Risking

ASEAN Faces Growing Pressures Amid China's Export Surge

• ASEAN has significantly benefited from China's rapid growth and integration into global supply chains, but it is now facing mounting pressures due to Chinese industrial overcapacity.
• China's exports to ASEAN have rapidly increased, surpassing its exports to the U.S. and EU since 2023, with a further 12% growth in 2024, mainly in intermediate and increasingly final goods.
• ASEAN exports to China have decreased by 3% since 2022, contributing to widening trade deficits, particularly affecting Indonesia and Thailand.
• ASEAN now faces challenges from China's overcapacity in sectors like steel, aluminum, petrochemicals, electrical machinery, and semiconductors, resulting in cheap imports displacing domestic industries.
• ASEAN governments must navigate between leveraging Chinese imports for growth and protecting local industries from being overwhelmed by artificially low-priced goods.

Economic Impacts of China's Industrial Overcapacity on ASEAN Industries

• ASEAN is becoming the primary offshore manufacturing base for Chinese companies, notably in clean energy sectors (EVs, solar panels, and batteries).
• Chinese overcapacity has particularly impacted industries such as textiles, steel, aluminum, petrochemicals, construction machinery, electrical equipment, semiconductors, and medical devices.
...`,
                description: "ASEAN has significantly benefited from China's rapid growth and integration into global supply chains, but it is now facing mounting pressures due to Chinese industrial overcapacity",
                filename: "ASEAN Caught Between China's Export.txt",
                timestamp: "2025-03-25T10:30:00.000Z",
                id: "sample1"
            },
            {
                title: "Bill Gates on AI and Innovation",
                content: `Bill Gates on AI and Innovation

Bill Gates's Reflections on Innovation and Technology

• Bill Gates returned to Harvard, discussing his experiences and innovations since dropping out in 1975 to establish Microsoft, highlighting his goal of democratizing computing access.
• Gates frames the rise of artificial intelligence (AI) as an extension of the digital revolution, built upon existing foundations like chips and the internet, aiming at "free intelligence."
• Unlike earlier personal computing developments, AI represents a significant shift because it doesn't just amplify human capabilities but could replace them entirely.
• Gates highlights the transformational potential of AI but emphasizes critical differences, including unprecedented scalability and the existential impact of providing intelligence freely.

Challenges and Ethical Considerations with AI

• Gates previously viewed the "digital divide" as an issue of access, but now identifies deeper concerns about how empowering individuals with technology can sometimes lead to misuse or harm.
...`,
                description: "Bill Gates returned to Harvard, discussing his experiences and innovations since dropping out in 1975 to establish Microsoft, highlighting his goal of democratizing computing access",
                filename: "Bill Gates on AI and Innovation.txt",
                timestamp: "2025-03-26T14:15:00.000Z",
                id: "sample2"
            },
            {
                title: "China's next move | GZERO World with Ian Bremmer",
                content: `China's next move | GZERO World with Ian Bremmer

Xi Jinping's Control and Domestic Leadership

• Xi Jinping has significantly increased control over China's political, economic, and military systems compared to five years ago.
• Despite internal complaints and economic struggles, Xi maintains strong leadership through major personnel and structural reforms within security services and the military.
• The Chinese government under Xi is attempting to restructure the economy away from real estate towards high-tech industries, despite challenges and economic downturns.
• Xi's leadership effectiveness is debated, particularly regarding economic performance and his handling of COVID-19, initially praised but later criticized.
• Domestic economic policies under Xi may have been overly cautious, risking deeper economic stagnation and deflation.

China's Economic and Technological Ambitions

• China projects confidence in sustained GDP growth and global rise through 2025, despite ongoing economic difficulties.
...`,
                description: "Xi Jinping has significantly increased control over China's political, economic, and military systems compared to five years ago",
                filename: "China's next move.txt",
                timestamp: "2025-03-28T09:45:00.000Z",
                id: "sample3"
            }
        ];

        // Check if samples already exist
        const existingSummaries = JSON.parse(localStorage.getItem('summaries')) || [];
        if (existingSummaries.length === 0) {
            localStorage.setItem('summaries', JSON.stringify(samples));
            loadSummaries();
        }
    }

    // Uncomment this line to load sample data for demo purposes
    // addSampleData();
});
