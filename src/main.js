// Handle form submission with background delivery (no visitor email app popup)
const quoteForm = document.getElementById('quoteForm');

if (quoteForm) {
    quoteForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const submitButton = quoteForm.querySelector('button[type="submit"]');
        const statusEl = document.getElementById('quoteStatus');
        const quoteFlipCard = document.getElementById('quoteFlipCard');

        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();
        const poolAddress = document.getElementById('pool-address').value.trim();
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value.trim();

        if (!name || !phone || !email || !poolAddress || !service) {
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
                    _replyto: `${name} <${email}>`,
                    name,
                    phone,
                    email,
                    poolAddress,
                    service,
                    message: message || 'None'
                })
            });

            if (!response.ok) {
                throw new Error('Failed to submit quote request');
            }

            if (statusEl) {
                statusEl.textContent = '';
                statusEl.className = 'form-status';
            }

            quoteForm.reset();

            if (quoteFlipCard) {
                quoteFlipCard.classList.add('flipped');
            }
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

function ensureQuoteFormRuntimeSetup() {
    const poolAddressInput = document.getElementById('pool-address');
    if (!poolAddressInput) return { poolAddressInput: null, poolAddressSuggestions: null };

    poolAddressInput.setAttribute('autocomplete', 'street-address');

    let poolAddressSuggestions = document.getElementById('pool-address-suggestions');
    if (!poolAddressSuggestions) {
        poolAddressSuggestions = document.createElement('datalist');
        poolAddressSuggestions.id = 'pool-address-suggestions';
        poolAddressInput.insertAdjacentElement('afterend', poolAddressSuggestions);
    }
    poolAddressInput.setAttribute('list', 'pool-address-suggestions');

    const serviceSelect = document.getElementById('service');
    if (serviceSelect) {
        const selectedValue = serviceSelect.value;
        const expectedOptions = [
            { value: '', label: '-- Select a service --' },
            { value: 'weekly-service', label: 'Weekly pool service: water balancing and/or cleaning' },
            { value: 'one-time-or-vacation', label: 'One-time pool cleaning or vacation maintenance' },
            { value: 'green-recovery', label: 'Green pool recovery' },
            { value: 'filter-cleaning', label: 'Filter cleaning' },
            { value: 'other', label: 'Other / Not Sure' }
        ];

        serviceSelect.innerHTML = '';
        expectedOptions.forEach(({ value, label }) => {
            const option = document.createElement('option');
            option.value = value;
            option.textContent = label;
            serviceSelect.appendChild(option);
        });

        if (expectedOptions.some((entry) => entry.value === selectedValue)) {
            serviceSelect.value = selectedValue;
        }
    }

    return { poolAddressInput, poolAddressSuggestions };
}

// Address autocomplete for quote form
const { poolAddressInput, poolAddressSuggestions } = ensureQuoteFormRuntimeSetup();
if (poolAddressInput && poolAddressSuggestions) {
    let addressRequestTimer = null;
    let activeAddressRequestId = 0;

    const clearAddressSuggestions = () => {
        poolAddressSuggestions.innerHTML = '';
    };

    const pushAddressSuggestion = (text) => {
        const option = document.createElement('option');
        option.value = text;
        poolAddressSuggestions.appendChild(option);
    };

    const fetchAddressSuggestions = async (query, requestId) => {
        const endpoint = `https://nominatim.openstreetmap.org/search?format=jsonv2&addressdetails=1&countrycodes=us&limit=6&q=${encodeURIComponent(query)}`;
        const response = await fetch(endpoint, {
            headers: {
                'Accept-Language': 'en-US,en;q=0.9'
            }
        });
        if (!response.ok) return;

        const results = await response.json();
        if (requestId !== activeAddressRequestId) return;

        clearAddressSuggestions();
        const unique = new Set();

        results.forEach((item) => {
            const label = String(item?.display_name || '').trim();
            if (!label || unique.has(label)) return;
            unique.add(label);
            pushAddressSuggestion(label);
        });
    };

    poolAddressInput.addEventListener('input', () => {
        const query = poolAddressInput.value.trim();
        activeAddressRequestId += 1;
        const requestId = activeAddressRequestId;

        if (addressRequestTimer) {
            clearTimeout(addressRequestTimer);
            addressRequestTimer = null;
        }

        if (query.length < 4) {
            clearAddressSuggestions();
            return;
        }

        addressRequestTimer = setTimeout(() => {
            fetchAddressSuggestions(query, requestId).catch(() => {
                if (requestId === activeAddressRequestId) {
                    clearAddressSuggestions();
                }
            });
        }, 220);
    });

    poolAddressInput.addEventListener('blur', () => {
        setTimeout(clearAddressSuggestions, 250);
    });
}

console.log('North Texas Elite Pool Care website loaded');

document.addEventListener('keydown', (event) => {
    if (event.key !== 'Backspace') return;
    const target = event.target;
    const isEditable = target instanceof HTMLInputElement
        || target instanceof HTMLTextAreaElement
        || target instanceof HTMLSelectElement
        || target?.isContentEditable;
    if (!isEditable) event.preventDefault();
});

const buildBadge = document.createElement('div');
buildBadge.className = 'build-badge';
const buildDate = new Date(document.lastModified);
if (Number.isNaN(buildDate.getTime())) {
    buildBadge.textContent = 'Build live';
} else {
    const year = buildDate.getFullYear();
    const month = String(buildDate.getMonth() + 1).padStart(2, '0');
    const day = String(buildDate.getDate()).padStart(2, '0');
    const hour = String(buildDate.getHours()).padStart(2, '0');
    const minute = String(buildDate.getMinutes()).padStart(2, '0');
    buildBadge.textContent = `Build ${year}.${month}.${day}.${hour}${minute}`;
}
document.body.appendChild(buildBadge);
