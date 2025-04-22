// JavaScript for Newsletter Section
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('.newsletter-input');
            const email = emailInput.value.trim();
            
            if (email && isValidEmail(email)) {
                // Here you would typically send the email to your server
                // For now, we'll just show a success message
                showSuccessMessage(emailInput);
            } else {
                showErrorMessage(emailInput);
            }
        });
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showSuccessMessage(inputElement) {
        const parent = inputElement.parentElement;
        
        // Remove any existing messages
        removeMessages(parent);
        
        // Create success message
        const successMessage = document.createElement('div');
        successMessage.className = 'newsletter-success-message';
        successMessage.innerHTML = '<i class="fas fa-check-circle"></i> تم الاشتراك بنجاح! شكراً لك.';
        
        // Add success message after the form
        parent.parentElement.insertBefore(successMessage, parent.nextSibling);
        
        // Clear the input
        inputElement.value = '';
        
        // Remove the message after 5 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    }
    
    function showErrorMessage(inputElement) {
        const parent = inputElement.parentElement;
        
        // Remove any existing messages
        removeMessages(parent);
        
        // Create error message
        const errorMessage = document.createElement('div');
        errorMessage.className = 'newsletter-error-message';
        errorMessage.innerHTML = '<i class="fas fa-exclamation-circle"></i> يرجى إدخال بريد إلكتروني صحيح.';
        
        // Add error message after the form
        parent.parentElement.insertBefore(errorMessage, parent.nextSibling);
        
        // Focus on the input
        inputElement.focus();
        
        // Remove the message after 5 seconds
        setTimeout(() => {
            errorMessage.remove();
        }, 5000);
    }
    
    function removeMessages(parent) {
        const successMessage = parent.parentElement.querySelector('.newsletter-success-message');
        const errorMessage = parent.parentElement.querySelector('.newsletter-error-message');
        
        if (successMessage) {
            successMessage.remove();
        }
        
        if (errorMessage) {
            errorMessage.remove();
        }
    }
});

// Add CSS for messages
const style = document.createElement('style');
style.textContent = `
.newsletter-success-message,
.newsletter-error-message {
    margin-top: 15px;
    padding: 10px 15px;
    border-radius: 5px;
    text-align: center;
    animation: fadeIn 0.3s ease-in-out;
}

.newsletter-success-message {
    background-color: rgba(40, 167, 69, 0.2);
    color: #fff;
    border: 1px solid rgba(40, 167, 69, 0.3);
}

.newsletter-error-message {
    background-color: rgba(220, 53, 69, 0.2);
    color: #fff;
    border: 1px solid rgba(220, 53, 69, 0.3);
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
`;
document.head.appendChild(style);
