/**
 * Air France Web Portal - Interactive Scripts (Versão Melhorada)
 * Unidade Curricular: Tecnologias Web (TWeb) - Ano 2024
 * Autor: Pedro Costa (2024136184)
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initVerticalMenu();
    initFlightTabs();
    initDropdownFilter();
    initFlightSearch();
    initAuthModal();
    initLanguageModal();
    initSearchModal();
});

/* ========================================================
   1. Navegação Principal e Tabs
   ======================================================== */
function initNavigation() {
    const navLinks = document.querySelectorAll('.menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navLinks.forEach(item => item.classList.remove('active'));
            link.classList.add('active');
        });
    });
}

function initVerticalMenu() {
    const menuBtn = document.querySelector('.menu-button');
    const closeBtn = document.querySelector('.close-menu-button');
    const verticalMenu = document.getElementById('vertical-menu');
    const overlay = document.getElementById('menu-overlay');

    if (!verticalMenu) return;

    const openMenu = () => {
        verticalMenu.classList.add('open');
        if (overlay) overlay.classList.add('visible');
        document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
        verticalMenu.classList.remove('open');
        if (overlay) overlay.classList.remove('visible');
        document.body.style.overflow = '';
    };

    if (menuBtn) menuBtn.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    if (overlay) overlay.addEventListener('click', closeMenu);

    const verticalItems = verticalMenu.querySelectorAll('ul li a');
    verticalItems.forEach(item => {
        item.addEventListener('click', (e) => {
            verticalItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            closeMenu();
        });
    });
}

function initFlightTabs() {
    const tabs = document.querySelectorAll('.tabsform .tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const isMiles = tab.textContent.includes('Milhas');
            const submitBtn = document.getElementById('search-flight-btn');
            if (submitBtn) {
                submitBtn.innerHTML = isMiles ? 'Pesquisar com Milhas <i class="fas fa-coins"></i>' : 'Pesquisar Voos <i class="fas fa-arrow-right"></i>';
            }
        });
    });
}

/* ========================================================
   2. Dropdown de Destinos
   ======================================================== */
function initDropdownFilter() {
    const dropdownButton = document.querySelector('.dropdown-button');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const dropdownItems = document.querySelectorAll('.dropdown-menu li');

    if (!dropdownButton || !dropdownMenu) return;

    dropdownButton.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownMenu.classList.toggle('show');
    });

    document.addEventListener('click', () => {
        dropdownMenu.classList.remove('show');
    });

    dropdownItems.forEach((item) => {
        item.addEventListener('click', () => {
            dropdownButton.textContent = item.textContent + ' ▼';
            dropdownItems.forEach((i) => i.classList.remove('selected'));
            item.classList.add('selected');
            filterOffersByOrigin(item.textContent.trim());
        });
    });
}

function filterOffersByOrigin(originName) {
    const cards = document.querySelectorAll('.card .card-item');
    cards.forEach((card, index) => {
        card.style.animation = 'none';
        card.offsetHeight; // trigger reflow
        card.style.animation = `fadeInUp 0.4s ease forwards ${index * 0.08}s`;
    });
    showToast(`Origem atualizada para: ${originName}`);
}

/* ========================================================
   3. Simulador Interativo de Pesquisa de Voos
   ======================================================== */
function initFlightSearch() {
    const searchBtn = document.getElementById('search-flight-btn');
    const resultsContainer = document.getElementById('flight-results-container');
    const departureInput = document.getElementById('input-departure');
    const arrivalInput = document.getElementById('input-arrival');
    const dateInput = document.getElementById('input-date');
    const tripTypeSelect = document.getElementById('select-trip-type');

    if (!searchBtn || !resultsContainer) return;

    searchBtn.addEventListener('click', (e) => {
        e.preventDefault();

        const from = departureInput?.value.trim() || 'Lisboa (LIS)';
        const to = arrivalInput?.value.trim() || 'Paris (CDG)';
        const date = dateInput?.value || new Date().toISOString().split('T')[0];
        const tripType = tripTypeSelect?.value || 'Ida e volta';

        // Feedback de carregamento
        searchBtn.disabled = true;
        searchBtn.innerHTML = '<span class="spinner"></span> A pesquisar voos...';

        setTimeout(() => {
            searchBtn.disabled = false;
            searchBtn.innerHTML = 'Pesquisar Voos <i class="fas fa-arrow-right"></i>';
            renderFlightResults(from, to, date, tripType, resultsContainer);
            resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 600);
    });
}

function renderFlightResults(from, to, date, tripType, container) {
    const mockFlights = [
        {
            code: 'AF 1125',
            depTime: '06:15',
            arrTime: '09:45',
            from: from,
            to: to,
            duration: '2h 30m',
            type: 'Voo Direto',
            aircraft: 'Airbus A321neo',
            price: 139,
            classType: 'Economy Standard'
        },
        {
            code: 'AF 1625',
            depTime: '11:40',
            arrTime: '15:15',
            from: from,
            to: to,
            duration: '2h 35m',
            type: 'Voo Direto',
            aircraft: 'Airbus A320',
            price: 185,
            classType: 'Economy Flex'
        },
        {
            code: 'AF 1825',
            depTime: '18:20',
            arrTime: '21:55',
            from: from,
            to: to,
            duration: '2h 35m',
            type: 'Voo Direto',
            aircraft: 'Boeing 777-300ER',
            price: 245,
            classType: 'Premium Economy'
        }
    ];

    container.innerHTML = `
        <div class="results-header">
            <div>
                <h2><i class="fas fa-plane-departure"></i> Voos Disponíveis: ${escapeHTML(from)} ➔ ${escapeHTML(to)}</h2>
                <p class="results-subtitle">Data: <strong>${escapeHTML(date)}</strong> | Modalidade: <strong>${escapeHTML(tripType)}</strong> | Operado por <strong>Air France & SkyTeam</strong></p>
            </div>
            <button class="btn-close-results" id="btn-close-results">&times; Fechar Resultados</button>
        </div>
        <div class="flights-list">
            ${mockFlights.map(flight => `
                <div class="flight-card">
                    <div class="flight-airline">
                        <img src="img/Air_France_Logo.svg.png" alt="Air France" class="flight-logo">
                        <div class="flight-meta">
                            <span class="flight-code">${flight.code}</span>
                            <span class="flight-aircraft">${flight.aircraft}</span>
                        </div>
                    </div>
                    <div class="flight-timeline">
                        <div class="flight-point">
                            <span class="time">${flight.depTime}</span>
                            <span class="city">${flight.from}</span>
                        </div>
                        <div class="flight-route">
                            <span class="duration">${flight.duration}</span>
                            <div class="route-line"><i class="fas fa-plane"></i></div>
                            <span class="badge-direct">${flight.type}</span>
                        </div>
                        <div class="flight-point">
                            <span class="time">${flight.arrTime}</span>
                            <span class="city">${flight.to}</span>
                        </div>
                    </div>
                    <div class="flight-pricing">
                        <span class="flight-class">${flight.classType}</span>
                        <span class="flight-price">${flight.price} €</span>
                        <button class="btn-book-flight" data-flight="${flight.code}" data-price="${flight.price}">
                            Selecionar <i class="fas fa-chevron-right"></i>
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;

    container.style.display = 'block';

    document.getElementById('btn-close-results')?.addEventListener('click', () => {
        container.style.display = 'none';
    });

    container.querySelectorAll('.btn-book-flight').forEach(btn => {
        btn.addEventListener('click', () => {
            const code = btn.getAttribute('data-flight');
            const price = btn.getAttribute('data-price');
            openBookingModal(code, price, from, to);
        });
    });
}

function openBookingModal(code, price, from, to) {
    const modal = document.getElementById('booking-modal');
    const details = document.getElementById('booking-details');
    if (!modal || !details) return;

    details.innerHTML = `
        <p><strong>Voo:</strong> ${escapeHTML(code)}</p>
        <p><strong>Percurso:</strong> ${escapeHTML(from)} ➔ ${escapeHTML(to)}</p>
        <p><strong>Preço Final:</strong> <span class="highlight-price">${price} €</span> (taxas incluídas)</p>
        <p class="booking-notice"><i class="fas fa-check-circle"></i> Bagagem de mão (12kg) e refeição a bordo incluídas.</p>
    `;

    modal.classList.add('visible');
}

/* ========================================================
   4. Modais (Autenticação, Idioma, Pesquisa Geral)
   ======================================================== */
function initAuthModal() {
    const loginButtons = document.querySelectorAll('.btn-login-trigger');
    const modal = document.getElementById('login-modal');
    const closeBtn = document.getElementById('close-login-modal');
    const form = document.getElementById('login-form');

    if (!modal) return;

    loginButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('visible');
        });
    });

    closeBtn?.addEventListener('click', () => modal.classList.remove('visible'));

    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('visible');
    });

    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email')?.value.trim();
        const remember = document.getElementById('remember-me')?.checked;

        if (!email) {
            alert('Por favor, introduza um e-mail ou número Flying Blue válido.');
            return;
        }

        modal.classList.remove('visible');
        showToast(`Sessão iniciada com sucesso: ${email}`);

        // Atualizar visual do botão na navbar
        document.querySelectorAll('.btn-login-trigger span b').forEach(el => {
            el.textContent = email.split('@')[0];
        });
    });
}

function initLanguageModal() {
    const langBtn = document.querySelector('.btn-lang-trigger');
    const modal = document.getElementById('language-modal');
    const closeBtn = document.getElementById('close-lang-modal');

    if (!modal || !langBtn) return;

    langBtn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('visible');
    });

    closeBtn?.addEventListener('click', () => modal.classList.remove('visible'));

    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('visible');
    });

    modal.querySelectorAll('.country-option').forEach(option => {
        option.addEventListener('click', () => {
            const country = option.getAttribute('data-name');
            const flag = option.querySelector('img')?.getAttribute('src');
            if (langBtn.querySelector('span b')) {
                langBtn.querySelector('span b').textContent = country;
            }
            if (flag && langBtn.querySelector('img')) {
                langBtn.querySelector('img').setAttribute('src', flag);
            }
            modal.classList.remove('visible');
            showToast(`País e Idioma alterados para: ${country}`);
        });
    });
}

function initSearchModal() {
    const searchTrigger = document.querySelector('.btn-search-trigger');
    const modal = document.getElementById('quick-search-modal');
    const closeBtn = document.getElementById('close-quick-search');
    const searchInput = document.getElementById('quick-search-input');

    if (!modal || !searchTrigger) return;

    searchTrigger.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('visible');
        searchInput?.focus();
    });

    closeBtn?.addEventListener('click', () => modal.classList.remove('visible'));

    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('visible');
    });
}

/* ========================================================
   5. Notificações Toast & Utilitários
   ======================================================== */
function showToast(message) {
    let toast = document.getElementById('app-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'app-toast';
        toast.className = 'app-toast';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3500);
}

function escapeHTML(str) {
    return String(str).replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}

// Fecho universal com tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.visible').forEach(m => m.classList.remove('visible'));
        const vMenu = document.getElementById('vertical-menu');
        const overlay = document.getElementById('menu-overlay');
        if (vMenu) vMenu.classList.remove('open');
        if (overlay) overlay.classList.remove('visible');
        document.body.style.overflow = '';
    }
});
