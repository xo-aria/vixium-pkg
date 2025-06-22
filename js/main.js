document.querySelectorAll('.ripple-btn').forEach(card => {
    card.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        this.appendChild(ripple);
        
        ripple.addEventListener('animationend', () => {
            ripple.remove();
        });
    });
});


function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');

    if (newTheme === 'dark') {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
    } else {
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
    }
}

function switchTab(tabGroup, targetTab) {
    const tabButtons = document.querySelectorAll(`[data-tab-group="${tabGroup}"]`);
    const tabContents = document.querySelectorAll(`[data-tab-content="${tabGroup}"]`);

    tabButtons.forEach(btn => {
        if (btn.dataset.tabTarget === targetTab) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    tabContents.forEach(content => {
        if (content.dataset.tabName === targetTab) {
            content.classList.remove('hidden');
        } else {
            content.classList.add('hidden');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.carousel').forEach(carousel => {
    carousel.addEventListener('wheel', (e) => {
      e.preventDefault();
      carousel.scrollLeft += e.deltaY;
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
    window.toggleModal = function(modalId, show = true) {
        const modal = document.getElementById(modalId);
        if (!modal) return;

        if (show) {
            modal.classList.add('show');
        } else {
            modal.classList.remove('show');
        }
    };

    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
            }
        });
    });
});

function toggleDrawer() {
    const drawer = document.getElementById('drawer-menu');
    if (drawer) {
        drawer.classList.toggle('hidden');
    }
}

function toggleSubmenu(element) {
    const submenu = element.nextElementSibling;
    const toggleIcon = element.querySelector('.submenu-toggle');

    if (submenu && toggleIcon) {
        submenu.classList.toggle('hidden');
        toggleIcon.classList.toggle('open');
    }
}

document.addEventListener('click', (event) => {
    const drawer = document.getElementById('drawer-menu');
    const drawerContent = document.querySelector('.drawer-content');
    const menuButton = event.target.closest('.btn[aria-label="Ł…Ł†Ł"]');

    if (drawer && drawerContent && !drawerContent.contains(event.target) && !menuButton) {
        drawer.classList.add('hidden');
    }
});

function showNotification(type, message, position = 'top-left') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
    `;
    document.body.appendChild(notification);

    setTimeout(() => notification.classList.add('show'), 10);

    const autoClose = setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 500);
    }, 5000);
}

function copy(x) {
    let text = '';
    if (x instanceof HTMLElement) {
        text = x.innerText || x.textContent || '';
    } else if (typeof x === 'string') {
        text = x;
    } else {
        showNotification('error', 'Ł†ŁŲ¹ ŁŲ±ŁŲÆŪ Ł†Ų§Ł…Ų¹ŲŖŲØŲ± Ų§Ų³ŲŖ');
        return;
    }

    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('success', 'Ł…ŲŖŁ† ŲØŲ§ Ł…ŁŁŁ‚ŪŲŖ Ś©Ł¾Ū Ų´ŲÆ');
        }).catch(() => {
            fallbackCopy(text);
        });
    } else {
        fallbackCopy(text);
    }

    function fallbackCopy(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.top = '-9999px';
        textarea.setAttribute('readonly', '');
        document.body.appendChild(textarea);
        textarea.select();
        try {
            const success = document.execCommand('copy');
            if (success) {
                showNotification('success', 'Ł…ŲŖŁ† ŲØŲ§ Ł…ŁŁŁ‚ŪŲŖ Ś©Ł¾Ū Ų´ŲÆ');
            } else {
                showNotification('error', 'Ś©Ł¾Ū Ų§Ł†Ų¬Ų§Ł… Ł†Ų´ŲÆ');
            }
        } catch {
            showNotification('error', 'Ś©Ł¾Ū Ų§Ł†Ų¬Ų§Ł… Ł†Ų´ŲÆ');
        }
        document.body.removeChild(textarea);
    }
}