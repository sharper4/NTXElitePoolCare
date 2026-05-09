// Handle form submission
document.getElementById('quoteForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const poolAddress = document.getElementById('pool-address').value;
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value;

    // Validate form
    if (!name || !phone || !poolAddress || !service) {
        alert('Please fill in all required fields');
        return;
    }

    // Format the quote request message
    const emailBody = `
Quote Request from: ${name}
Phone: ${phone}
Pool Address: ${poolAddress}
Service Type: ${service}
Additional Notes: ${message || 'None'}
    `;

    // Send email via mailto
    const mailtoLink = `mailto:ntxelitepoolcare@gmail.com?subject=Quote Request from ${encodeURIComponent(name)}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoLink;

    // Optional: Show success message
    setTimeout(() => {
        alert('Thank you! Your quote request has been sent. We will contact you within 24 hours.');
        document.getElementById('quoteForm').reset();
    }, 500);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Phone number formatting
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
            if (value.length <= 3) {
                value = value;
            } else if (value.length <= 6) {
                value = value.slice(0, 3) + '-' + value.slice(3);
            } else {
                value = value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6, 10);
            }
        }
        e.target.value = value;
    });
}

console.log('North Texas Elite Pool Care website loaded');
