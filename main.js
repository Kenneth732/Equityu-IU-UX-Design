// Shared JavaScript for Equity Bank Career Portal

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all pages
    
    // Set current year in footer
    const currentYear = new Date().getFullYear();
    const yearElements = document.querySelectorAll('.eb-footer-bottom p');
    yearElements.forEach(el => {
        if (el.textContent.includes('2023')) {
            el.textContent = el.textContent.replace('2023', currentYear);
        }
    });
    
    // Navigation active state
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.eb-main-nav a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('eb-active');
        } else {
            link.classList.remove('eb-active');
        }
    });
    
    // Auth button functionality (shared)
    const signInButtons = document.querySelectorAll('.eb-btn-signin');
    const registerButtons = document.querySelectorAll('.eb-btn-register');
    
    signInButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // In a real implementation, this would open a sign-in modal
            alert('Opening secure sign-in portal...\n\nIn a production environment, this would redirect to authentication.');
        });
    });
    
    registerButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // In a real implementation, this would open a registration form
            alert('Opening account registration...\n\nIn a production environment, this would show a registration form.');
        });
    });
    
    // Initialize tooltips if needed
    initializeTooltips();
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

// Tooltip initialization
function initializeTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function(e) {
            const tooltipText = this.getAttribute('data-tooltip');
            const tooltip = document.createElement('div');
            tooltip.className = 'eb-tooltip';
            tooltip.textContent = tooltipText;
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
            tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
        });
        
        element.addEventListener('mouseleave', function() {
            const tooltip = document.querySelector('.eb-tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
}

// Form validation helper
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return true;
    
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = 'var(--eb-error)';
            isValid = false;
            
            // Reset border on input
            field.addEventListener('input', function() {
                this.style.borderColor = '';
            });
        }
    });
    
    return isValid;
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

// Debounce function for search inputs
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Session management
const sessionManager = {
    setItem: function(key, value) {
        try {
            localStorage.setItem(`eb-careers-${key}`, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('LocalStorage error:', e);
            return false;
        }
    },
    
    getItem: function(key) {
        try {
            const item = localStorage.getItem(`eb-careers-${key}`);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.error('LocalStorage error:', e);
            return null;
        }
    },
    
    removeItem: function(key) {
        try {
            localStorage.removeItem(`eb-careers-${key}`);
            return true;
        } catch (e) {
            console.error('LocalStorage error:', e);
            return false;
        }
    },
    
    clearSession: function() {
        try {
            const keys = Object.keys(localStorage);
            keys.forEach(key => {
                if (key.startsWith('eb-careers-')) {
                    localStorage.removeItem(key);
                }
            });
            return true;
        } catch (e) {
            console.error('LocalStorage error:', e);
            return false;
        }
    }
};

// Export for module usage if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        sessionManager,
        validateForm,
        formatCurrency,
        debounce
    };
}
