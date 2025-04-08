function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function submitForm(formId) {
    const form = document.getElementById(formId);
    const name = form.querySelector('input[name="name"]').value;
    const email = form.querySelector('input[name="email"]').value;
    const message = form.querySelector('textarea').value;

    if (name && email && message) {
        alert('تم إرسال طلبك بنجاح!');
        form.reset();
    } else {
        alert('الرجاء ملء جميع الحقول.');
    }
}

function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value;
    if (message.trim() === '') return;

    // عرض الرسالة في الدردشة
    displayMessage(message, 'user');
    input.value = '';

    // رد الروبوت
    const botResponse = getBotResponse(message);
    displayMessage(botResponse, 'bot');

    // إظهار الاقتراحات إذا كانت الرسالة تحتوي على كلمة "مرحبا" أو "هاي"
    if (message.toLowerCase().includes('مرحبا') || message.toLowerCase().includes('هاي')) {
        showSuggestions();
    } else {
        hideSuggestions();
    }
}

function displayMessage(message, sender) {
    const chatMessages = document.getElementById('chat-messages');
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message', sender);
    messageElement.innerHTML = `<p>${message}</p>`;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getBotResponse(message) {
    const responses = {
        'مرحبا': 'أهلا! كيف يمكنني مساعدتك اليوم؟',
        'كيف حالك؟': 'أنا بخير، شكرًا لسؤالك!',
        'ما هو اسمك؟': 'أنا روبوت مساعد.',
        'ما هي ساعات العمل؟': 'نحن متاحون على مدار الساعة.',
        'كيف أتابع طلبي؟': 'يمكنك متابعة طلبك من خلال حسابك.',
        'ما هي سياسة الإرجاع؟': 'يمكنك إرجاع المنتج خلال 14 يومًا.'
    };
    return responses[message] || 'لم أفهم ذلك. يمكنك سؤالي عن شيء آخر!';
}

function showSuggestions() {
    const suggestions = [
        'ما هي ساعات العمل؟',
        'كيف أتابع طلبي؟',
        'ما هي سياسة الإرجاع؟'
    ];
    const suggestionsContainer = document.getElementById('suggestions');
    suggestionsContainer.innerHTML = '';
    suggestions.forEach(suggestion => {
        const button = document.createElement('button');
        button.innerText = suggestion;
        button.onclick = () => {
            document.getElementById('chat-input').value = suggestion;
            sendMessage();
        };
        suggestionsContainer.appendChild(button);
    });
}

function hideSuggestions() {
    const suggestionsContainer = document.getElementById('suggestions');
    suggestionsContainer.innerHTML = '';
}