// Dark mode toggle functionality
(function() {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    const themeIcon = themeToggle.querySelector('.theme-icon');

    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', currentTheme);
    updateIcon(currentTheme);

    // Toggle theme on button click
    themeToggle.addEventListener('click', function() {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateIcon(newTheme);
        updateAriaLabel(newTheme);
    });

    function updateIcon(theme) {
        themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
    }

    function updateAriaLabel(theme) {
        const label = theme === 'light' ? 'Bytt til mørk modus' : 'Bytt til lys modus';
        themeToggle.setAttribute('aria-label', label);
    }

    // Initialize aria-label
    updateAriaLabel(currentTheme);
})();

// Chatbot functionality
(function() {
    const chatToggle = document.getElementById('chatToggle');
    const chatContainer = document.getElementById('chatContainer');
    const chatClose = document.getElementById('chatClose');
    const chatForm = document.getElementById('chatForm');
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');
    const chatSend = document.getElementById('chatSend');

    // Chat API endpoint (Cloudflare Worker)
    const CHAT_API_URL = 'https://jonas-chatbot.jonas-arnesen.workers.dev';

    // Conversation history for context
    let conversationHistory = [];

    // System prompt with context about Jonas
    const systemPrompt = `Du er en vennlig AI-assistent for Jonas Arnesen sin personlige nettside.
Jonas er en masterstudent i intensivsykepleie med interesse for forskning og kunstig intelligens.
Han lager AI-genererte produkter og ressurser som han deler på nettsiden sin.
Svar alltid på norsk, vær hjelpsom og vennlig. Hold svarene konsise og relevante.
Hvis du ikke vet svaret på noe spesifikt om Jonas, si at du ikke har den informasjonen.`;

    // Toggle chat open/close
    chatToggle.addEventListener('click', function() {
        chatContainer.classList.add('open');
        chatToggle.classList.add('hidden');
        chatInput.focus();
    });

    chatClose.addEventListener('click', function() {
        chatContainer.classList.remove('open');
        chatToggle.classList.remove('hidden');
    });

    // Close chat with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && chatContainer.classList.contains('open')) {
            chatContainer.classList.remove('open');
            chatToggle.classList.remove('hidden');
        }
    });

    // Handle form submission
    chatForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const message = chatInput.value.trim();
        if (!message) return;

        // Clear input and disable send button
        chatInput.value = '';
        chatSend.disabled = true;

        // Add user message to chat
        addMessage(message, 'user');

        // Add loading indicator
        const loadingMessage = addLoadingMessage();

        // Add to conversation history
        conversationHistory.push({ role: 'user', content: message });

        try {
            const response = await fetch(CHAT_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    systemPrompt: systemPrompt,
                    messages: conversationHistory
                })
            });

            if (!response.ok) {
                throw new Error('API request failed');
            }

            const data = await response.json();
            const botResponse = data.response || 'Beklager, jeg kunne ikke generere et svar.';

            // Remove loading message and add bot response
            loadingMessage.remove();
            addMessage(botResponse, 'bot');

            // Add to conversation history
            conversationHistory.push({ role: 'assistant', content: botResponse });

            // Keep conversation history manageable (last 10 exchanges)
            if (conversationHistory.length > 20) {
                conversationHistory = conversationHistory.slice(-20);
            }

        } catch (error) {
            console.error('Chat error:', error);
            loadingMessage.remove();
            addMessage('Beklager, noe gikk galt. Prøv igjen senere.', 'bot');
        }

        chatSend.disabled = false;
        chatInput.focus();
    });

    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}`;

        const p = document.createElement('p');
        p.textContent = text;
        messageDiv.appendChild(p);

        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        return messageDiv;
    }

    function addLoadingMessage() {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chat-message bot loading';

        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('span');
            dot.className = 'dot';
            messageDiv.appendChild(dot);
        }

        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        return messageDiv;
    }
})();
