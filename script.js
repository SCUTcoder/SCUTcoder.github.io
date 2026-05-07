document.addEventListener('DOMContentLoaded', () => {
    initNavScroll();
    initScrollReveal();
    initMobileMenu();
});

// 导航栏滚动时加边框
function initNavScroll() {
    const navbar = document.querySelector('.navbar');
    const onScroll = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
}

// Intersection Observer 让内容出现时有淡入效果
function initScrollReveal() {
    const els = document.querySelectorAll(
        '.hero-content, .hero-visual, .timeline-card, .project-card, .research-item, .edu-item, .footer-main'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = `${i * 60}ms`;
                entry.target.classList.add('fade-up');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08 });

    els.forEach(el => observer.observe(el));
}

// 移动端菜单
function initMobileMenu() {
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.querySelector('.nav-menu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
        const isOpen = menu.classList.toggle('is-open');
        toggle.classList.toggle('is-open', isOpen);
        toggle.setAttribute('aria-expanded', String(isOpen));
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('is-open');
            toggle.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
        });
    });

    window.addEventListener('keydown', event => {
        if (event.key !== 'Escape') return;
        menu.classList.remove('is-open');
        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
    });
}

// 错误处理
window.addEventListener('error', e => console.error(e.error));
