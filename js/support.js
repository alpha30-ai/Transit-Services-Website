// Support Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // FAQ Functionality
    initFAQ();

    // File Upload Functionality
    initFileUpload();

    // Live Chat Functionality
    initLiveChat();
});

// Initialize FAQ Functionality
function initFAQ() {
    // FAQ Category Switching
    const categoryLinks = document.querySelectorAll('.faq-categories li');
    const categoryContents = document.querySelectorAll('.faq-category');

    categoryLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Remove active class from all links
            categoryLinks.forEach(item => item.classList.remove('active'));

            // Add active class to clicked link
            this.classList.add('active');

            // Hide all category contents
            categoryContents.forEach(content => content.classList.remove('active'));

            // Show the selected category content
            const category = this.getAttribute('data-category');
            document.getElementById(category).classList.add('active');
        });
    });

    // FAQ Accordion Functionality
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;

            // Check if the clicked item is already active
            const isActive = faqItem.classList.contains('active');

            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });

            // If the clicked item wasn't active, make it active
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
}

// Initialize File Upload Functionality
function initFileUpload() {
    const fileInput = document.getElementById('attachment');
    const fileNameDisplay = document.getElementById('file-name');

    if (fileInput && fileNameDisplay) {
        fileInput.addEventListener('change', function() {
            if (this.files.length > 0) {
                fileNameDisplay.textContent = this.files[0].name;
            } else {
                fileNameDisplay.textContent = '';
            }
        });
    }
}

// Initialize Live Chat Functionality
function initLiveChat() {
    const chatButton = document.getElementById('chat-button');
    const chatWidget = document.getElementById('chat-widget');
    const closeChat = document.getElementById('close-chat');
    const openChat = document.getElementById('open-chat');
    const sendMessage = document.getElementById('send-message');
    const chatInput = document.getElementById('chat-input-field');
    const chatMessages = document.getElementById('chat-messages');

    // Open chat when chat button is clicked
    if (chatButton && chatWidget) {
        chatButton.addEventListener('click', function() {
            chatWidget.style.display = 'block';
            chatButton.style.display = 'none';
        });
    }

    // Open chat when "Start Chat" button is clicked
    if (openChat && chatWidget && chatButton) {
        openChat.addEventListener('click', function(e) {
            e.preventDefault();
            chatWidget.style.display = 'block';
            chatButton.style.display = 'none';
        });
    }

    // Close chat when close button is clicked
    if (closeChat && chatWidget && chatButton) {
        closeChat.addEventListener('click', function() {
            chatWidget.style.display = 'none';
            chatButton.style.display = 'flex';
        });
    }

    // Send message functionality
    if (sendMessage && chatInput && chatMessages) {
        sendMessage.addEventListener('click', sendChatMessage);
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                sendChatMessage();
            }
        });
    }

    function sendChatMessage() {
        const message = chatInput.value.trim();

        if (message !== '') {
            // Get current time
            const now = new Date();
            const hours = now.getHours();
            const minutes = now.getMinutes();
            const timeString = `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;

            // Create user message element
            const userMessageHTML = `
                <div class="message user">
                    <div class="message-content">
                        <p>${message}</p>
                        <span class="time">${timeString}</span>
                    </div>
                </div>
            `;

            // Add user message to chat
            chatMessages.insertAdjacentHTML('beforeend', userMessageHTML);

            // Clear input field
            chatInput.value = '';

            // Scroll to bottom of chat
            chatMessages.scrollTop = chatMessages.scrollHeight;

            // Simulate response after a short delay
            setTimeout(function() {
                // Create support message element
                const supportMessageHTML = `
                    <div class="message support">
                        <div class="message-content">
                            <p>شكراً لتواصلك معنا. سيقوم أحد ممثلي خدمة العملاء بالرد عليك قريباً.</p>
                            <span class="time">${timeString}</span>
                        </div>
                    </div>
                `;

                // Add support message to chat
                chatMessages.insertAdjacentHTML('beforeend', supportMessageHTML);

                // Scroll to bottom of chat
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1000);
        }
    }
}

// Support Form Submission
document.addEventListener('DOMContentLoaded', function() {
    const supportForm = document.getElementById('support-form');

    if (supportForm) {
        supportForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Validate form (simple validation)
            if (name && email && subject && message) {
                // Here you would normally send the form data to a server
                // For now, we'll just show a success message

                // Create success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = `
                    <i class="fa-solid fa-check-circle"></i>
                    <p>تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.</p>
                `;

                // Add success message to form
                supportForm.innerHTML = '';
                supportForm.appendChild(successMessage);

                // Style success message
                successMessage.style.textAlign = 'center';
                successMessage.style.padding = '30px';
                successMessage.style.color = '#7A1CAC';

                // Style icon
                const icon = successMessage.querySelector('i');
                icon.style.fontSize = '48px';
                icon.style.marginBottom = '15px';

                // Style message text
                const messageText = successMessage.querySelector('p');
                messageText.style.fontSize = '18px';
                messageText.style.color = '#222';
            }
        });
    }
});
