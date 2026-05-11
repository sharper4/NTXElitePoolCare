// Handle form submission with background delivery (no visitor email app popup)
const quoteForm = document.getElementById('quoteForm');

if (quoteForm) {
    quoteForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const submitButton = quoteForm.querySelector('button[type="submit"]');
        const statusEl = document.getElementById('quoteStatus');

        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const poolAddress = document.getElementById('pool-address').value.trim();
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value.trim();

        if (!name || !phone || !poolAddress || !service) {
            if (statusEl) {
                statusEl.textContent = 'Please fill in all required fields.';
                statusEl.className = 'form-status error';
            }
            return;
        }

        if (statusEl) {
            statusEl.textContent = '';
            statusEl.className = 'form-status';
        }

        const originalButtonText = submitButton ? submitButton.textContent : '';
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
        }

        try {
            const response = await fetch('https://formsubmit.co/ajax/ntxelitepoolcare@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify({
                    _subject: `NTX Quote Request - ${name}`,
                    _captcha: 'false',
                    name,
                    phone,
                    poolAddress,
                    service,
                    message: message || 'None'
                })
            });

            if (!response.ok) {
                throw new Error('Failed to submit quote request');
            }

            if (statusEl) {
                statusEl.textContent = "Thank you. Your request has been received. We'll contact you within 24 hours to connect you with a qualified pool professional in your area. NEED IMMEDIATE HELP? Call or text 940-808-POOL.";
                statusEl.className = 'form-status success';
            }

            quoteForm.reset();
        } catch (error) {
            if (statusEl) {
                statusEl.textContent = 'Sorry, there was a problem sending your request. Please call or text 940-808-POOL for immediate help.';
                statusEl.className = 'form-status error';
            }
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText || 'Get My Free Quote';
            }
        }
    });
}

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
